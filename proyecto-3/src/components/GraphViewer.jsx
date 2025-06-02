import React, { useEffect, useRef, useState } from 'react';
import { Graph } from 'react-d3-graph';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import './GraphViewer.scss';

export default function GraphViewer() {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [zoomLevel, setZoomLevel] = useState(1);
  const containerRef = useRef();

  useEffect(() => {
    const fetchTreeData = async () => {
      const treeDoc = await getDoc(doc(db, 'employeesTree', 'tree'));
      if (treeDoc.exists()) {
        const tree = treeDoc.data().data || [];
        const nodes = [];
        const links = [];

        const traverse = (list, parent = null) => {
          for (const node of list) {
            const id = node.attributes?.id;
            if (!id) continue;
            nodes.push({ id, label: node.name });
            if (parent) links.push({ source: parent, target: id });
            if (node.children) traverse(node.children, id);
          }
        };

        traverse(tree);
        setGraphData({ nodes, links });

        // Centrar visualmente después de cargar
        setTimeout(() => {
          handleCenterGraph();
        }, 500);
      }
    };

    fetchTreeData();
  }, []);

  const handleZoomIn = () => {
    setZoomLevel((z) => Math.min(z + 0.1, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((z) => Math.max(z - 0.1, 0.2));
  };

  const handleZoomSlider = (e) => {
    setZoomLevel(parseFloat(e.target.value));
  };

  const handleCenterGraph = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight / 2 - container.clientHeight / 2,
        left: container.scrollWidth / 2 - container.clientWidth / 2,
        behavior: 'smooth',
      });
    }
  };

  const config = {
    nodeHighlightBehavior: true,
    node: {
      color: 'lightgreen',
      size: 400,
      highlightStrokeColor: 'blue',
      labelProperty: 'label',
    },
    link: {
      highlightColor: 'lightblue',
    },
    directed: true,
    panAndZoom: true,
    height: 600,
    width: 1000,
    d3: {
      gravity: -250,
      linkLength: 180,
      alphaTarget: 0.05,
      // 🚫 eliminado el uso directo de zoomLevel aquí
    },
    staticGraph: false,
    initialAutomaticRearrangeAfterDropNode: true,
  };

  return (
    <div className="graph-viewer-wrapper">
      <h2>Visualización del grafo de empleados</h2>

      <div className="controls">
        <button onClick={handleZoomIn}>+</button>
        <button onClick={handleZoomOut}>-</button>
        <button onClick={handleCenterGraph}>Centrar grafo</button>
        <input
          type="range"
          min="0.2"
          max="3"
          step="0.1"
          value={zoomLevel}
          onChange={handleZoomSlider}
        />
      </div>

      <div ref={containerRef} className="graph-area">
        {graphData.nodes.length > 0 ? (
          <Graph
            id="employee-graph"
            data={graphData}
            config={config}
          />
        ) : (
          <p className="loading">Cargando grafo...</p>
        )}
      </div>
    </div>
  );
}
