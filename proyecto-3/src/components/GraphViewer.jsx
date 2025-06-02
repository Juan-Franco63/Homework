// src/components/GraphViewer.jsx
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Graph } from "react-d3-graph";
import "./GraphViewer.scss";

export default function GraphViewer() {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchTree = async () => {
      const treeRef = doc(db, "employeesTree", "tree");
      const snapshot = await getDoc(treeRef);
      if (snapshot.exists()) {
        const data = snapshot.data().data || [];

        const nodes = [];
        const links = [];

        const traverse = (node, parent = null) => {
          if (!node?.attributes?.id) return;

          nodes.push({ id: node.attributes.id, name: node.name });

          if (parent) {
            links.push({
              source: parent.attributes.id,
              target: node.attributes.id,
            });
          }

          if (node.children) {
            node.children.forEach((child) => traverse(child, node));
          }
        };

        data.forEach((tree) => traverse(tree));

        setGraphData({ nodes, links });
      } else {
        console.warn("⚠️ No hay datos en Firestore.");
      }
    };

    fetchTree();
  }, []);

  // Centrar scroll al inicio
  useEffect(() => {
    if (scrollRef.current) {
      requestAnimationFrame(() => {
        const el = scrollRef.current;
        el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
        el.scrollTop = (el.scrollHeight - el.clientHeight) / 2;
      });
    }
  }, [graphData]);

  // Navegación con flechas del teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      const el = scrollRef.current;
      if (!el || ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) return;

      const scrollAmount = 40;

      switch (e.key) {
        case "ArrowUp":
          el.scrollTop -= scrollAmount;
          break;
        case "ArrowDown":
          el.scrollTop += scrollAmount;
          break;
        case "ArrowLeft":
          el.scrollLeft -= scrollAmount;
          break;
        case "ArrowRight":
          el.scrollLeft += scrollAmount;
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const config = {
    directed: true,
    nodeHighlightBehavior: true,
    node: {
      color: "#93c5fd",
      size: 400,
      highlightStrokeColor: "#2563eb",
      labelProperty: "name",
    },
    link: {
      highlightColor: "#f59e0b",
    },
    height: 1200,
    width: 2000,
    panAndZoom: true,
    staticGraph: false,
    d3: {
      gravity: -300,
      linkLength: 200,
    },
  };

  return (
    <div className="graph-viewer-container">
      <h2>Visualización del Grafo Organizacional</h2>
      <div className="graph-scrollable" ref={scrollRef}>
        <Graph id="employee-graph" data={graphData} config={config} />
      </div>
    </div>
  );
}
