import { useEffect, useState, useRef } from "react";
import { Graph } from "react-d3-graph";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import styles from "./GraphViewer.module.scss";

export default function GraphViewer() {
  const { user } = useAuth();
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [graphs, setGraphs] = useState([]);
  const [selectedGraphId, setSelectedGraphId] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [newGraphName, setNewGraphName] = useState("");
  const [nodeName, setNodeName] = useState("");
  const [sourceNode, setSourceNode] = useState("");
  const [targetNode, setTargetNode] = useState("");
  const containerRef = useRef(null);

  const graphsRef = user
    ? collection(db, "graphs", user.uid, "myGraphs")
    : null;

  const loadGraphsList = async () => {
    if (!graphsRef) return;
    const snap = await getDocs(graphsRef);
    const list = snap.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
    }));
    setGraphs(list);
    if (list.length > 0 && !selectedGraphId) {
      setSelectedGraphId(list[0].id);
      loadGraphData(list[0].id);
    }
  };

  const loadGraphData = async (id) => {
    const ref = doc(db, "graphs", user.uid, "myGraphs", id);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      setGraphData(snap.data().graph || { nodes: [], links: [] });
    }
  };

  const saveGraph = async (updatedGraph) => {
    if (!selectedGraphId || !user) return;
    const ref = doc(db, "graphs", user.uid, "myGraphs", selectedGraphId);
    await updateDoc(ref, { graph: updatedGraph });
    setGraphData(updatedGraph);
  };

  const createNewGraph = async () => {
    const docRef = await addDoc(graphsRef, {
      name: newGraphName || `Grafo ${graphs.length + 1}`,
      graph: {
        nodes: [{ id: "Nodo1", x: 400, y: 300 }],
        links: [],
      },
    });
    await loadGraphsList();
    setSelectedGraphId(docRef.id);
    loadGraphData(docRef.id);
    setNewGraphName("");
  };

  const addNode = () => {
    if (!selectedGraphId) return;
    const updated = { ...graphData };
    const newId = `Nodo${updated.nodes.length + 1}`;
    updated.nodes.push({ id: newId, x: 400, y: 300 });
    saveGraph(updated);
  };

  const removeNode = () => {
    if (!selectedGraphId || !selectedNode) return;
    const updated = { ...graphData };
    updated.nodes = updated.nodes.filter((n) => n.id !== selectedNode);
    updated.links = updated.links.filter(
      (l) => l.source !== selectedNode && l.target !== selectedNode
    );
    saveGraph(updated);
    setSelectedNode(null);
  };

  const addLink = () => {
    if (!selectedGraphId || !sourceNode || !targetNode) return;
    const updated = { ...graphData };
    updated.links.push({ source: sourceNode, target: targetNode });
    saveGraph(updated);
    setSourceNode("");
    setTargetNode("");
  };

  const removeLink = () => {
    if (!selectedGraphId) return;
    const updated = { ...graphData };
    updated.links.pop();
    saveGraph(updated);
  };

  const renameNode = () => {
    if (!selectedGraphId || !selectedNode || !nodeName) return;
    const updated = { ...graphData };
    updated.nodes = updated.nodes.map((n) =>
      n.id === selectedNode ? { ...n, id: nodeName } : n
    );
    updated.links = updated.links.map((l) => ({
      source: l.source === selectedNode ? nodeName : l.source,
      target: l.target === selectedNode ? nodeName : l.target,
    }));
    saveGraph(updated);
    setSelectedNode(nodeName);
    setNodeName("");
  };

  useEffect(() => {
    loadGraphsList();
  }, [user]);

  const config = {
    nodeHighlightBehavior: true,
    node: {
      color: "#4477cc",
      size: 400,
      highlightStrokeColor: "#66ccff",
    },
    link: {
      highlightColor: "#66ccff",
    },
    panAndZoom: true,
    directed: true,
    staticGraph: false,
    d3: {
      alphaTarget: 0.05,
      gravity: -200,
      linkLength: 120,
      disableLinkForce: false,
    },
    width: containerRef.current?.clientWidth || window.innerWidth - 600,
    height: containerRef.current?.clientHeight || window.innerHeight,
  };

  const validNodes = graphData.nodes.map((n) => ({
    ...n,
    x: n.x ?? 400,
    y: n.y ?? 300,
  }));

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.sidebar}>
        <h3>Centro de ciudades</h3>
        <ul>
          {graphs.map((g) => (
            <li
              key={g.id}
              className={g.id === selectedGraphId ? styles.active : ""}
              onClick={() => {
                setSelectedGraphId(g.id);
                loadGraphData(g.id);
              }}
            >
              {g.name}
            </li>
          ))}
        </ul>
        <div className={styles.newGraph}>
          <input
            value={newGraphName}
            onChange={(e) => setNewGraphName(e.target.value)}
            placeholder="Nuevo grafo"
          />
          <button onClick={createNewGraph}>Crear</button>
        </div>
      </div>

      <div className={styles.editorSidebar}>
        <h3>Edición de nodos</h3>
        <p>Nodo seleccionado: {selectedNode || "Ninguno"}</p>

        <div className={styles.actions}>
          <button onClick={addNode} disabled={!selectedGraphId}>
            Añadir nodo
          </button>
          <button
            onClick={removeNode}
            disabled={!selectedGraphId || !selectedNode}
          >
            Eliminar nodo
          </button>
          <input
            placeholder="Nuevo nombre"
            value={nodeName}
            onChange={(e) => setNodeName(e.target.value)}
          />
          <button
            onClick={renameNode}
            disabled={!selectedGraphId || !selectedNode || !nodeName}
          >
            Renombrar nodo
          </button>

          <select
            value={sourceNode}
            onChange={(e) => setSourceNode(e.target.value)}
          >
            <option value="">Origen</option>
            {graphData.nodes.map((n) => (
              <option key={n.id} value={n.id}>
                {n.id}
              </option>
            ))}
          </select>

          <select
            value={targetNode}
            onChange={(e) => setTargetNode(e.target.value)}
          >
            <option value="">Destino</option>
            {graphData.nodes.map((n) => (
              <option key={n.id} value={n.id}>
                {n.id}
              </option>
            ))}
          </select>

          <button
            onClick={addLink}
            disabled={!selectedGraphId || !sourceNode || !targetNode}
          >
            Añadir conexión
          </button>
          <button onClick={removeLink} disabled={!selectedGraphId}>
            Eliminar conexión
          </button>
        </div>
      </div>

      <div className={styles.viewer}>
        {graphData.nodes.length > 0 && (
          <Graph
            id="graph-id"
            data={{ nodes: validNodes, links: graphData.links }}
            config={config}
            onClickNode={(nodeId) => setSelectedNode(nodeId)}
          />
        )}
      </div>
    </div>
  );
}
