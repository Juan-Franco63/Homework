import { useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../context/AuthContext";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import styles from "./FirestoreTree.module.scss";
import { useNavigate } from "react-router-dom";

export default function FirestoreTree() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [trees, setTrees] = useState([]);
  const [selectedTreeId, setSelectedTreeId] = useState(null);
  const [treeData, setTreeData] = useState([]);
  const [selectedNodePath, setSelectedNodePath] = useState([]);
  const [newName, setNewName] = useState("");
  const [newTreeName, setNewTreeName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);

  const treesRef = user
    ? collection(db, "trees", user.uid, "myTrees")
    : null;

  const loadTreesList = async () => {
    if (!user) return;
    const snap = await getDocs(treesRef);
    const list = snap.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
    }));
    setTrees(list);
    if (list.length > 0 && !selectedTreeId) {
      setSelectedTreeId(list[0].id);
      loadTreeData(list[0].id);
    }
  };

  const loadTreeData = async (id) => {
    const ref = doc(db, "trees", user.uid, "myTrees", id);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data().tree || [];
      ensureCollapsedProp(data);
      setTreeData(data);
    }
  };

  const ensureCollapsedProp = (nodes) => {
    for (const node of nodes) {
      if (node._collapsed === undefined) {
        node._collapsed = false;
      }
      if (node.children) {
        ensureCollapsedProp(node.children);
      }
    }
  };

  const saveTree = async (updatedTree) => {
    const ref = doc(db, "trees", user.uid, "myTrees", selectedTreeId);
    await updateDoc(ref, { tree: updatedTree });
    setTreeData(updatedTree);
  };

  const createNewTree = async () => {
    const docRef = await addDoc(treesRef, {
      name: `Árbol ${trees.length + 1}`,
      tree: [
        {
          name: `Nodo raíz`,
          children: [],
          _collapsed: false,
        },
      ],
    });
    await loadTreesList();
    setSelectedTreeId(docRef.id);
    loadTreeData(docRef.id);
  };

  const findNodeByPath = (nodes, path) => {
    if (!path || path.length === 0) return null;
    for (const node of nodes) {
      if (node.name === path[0]) {
        if (path.length === 1) return node;
        if (node.children) {
          return findNodeByPath(node.children, path.slice(1));
        }
      }
    }
    return null;
  };

  const findPathToNode = (nodes, targetName, path = []) => {
    for (const node of nodes) {
      const currentPath = [...path, node.name];
      if (node.name === targetName) {
        return currentPath;
      }
      if (node.children) {
        const result = findPathToNode(node.children, targetName, currentPath);
        if (result) return result;
      }
    }
    return null;
  };

  const handleNodeClick = (nodeData, evt) => {
    const rawNode = nodeData.__data__ || nodeData.data || nodeData;
    const nodeName = rawNode.name;
    const path = findPathToNode(treeData, nodeName);
    if (!path) return;

    setSelectedNodePath(path);
    setNewName(nodeName);
  };

  const updateNodeName = () => {
    const updatedTree = structuredClone(treeData);
    const node = findNodeByPath(updatedTree, selectedNodePath);
    if (node) {
      node.name = newName;
      saveTree(updatedTree);
    }
  };

  const addChildNode = () => {
    const updatedTree = structuredClone(treeData);
    const node = findNodeByPath(updatedTree, selectedNodePath);
    if (node) {
      if (!node.children) node.children = [];
      node.children.push({ name: "Nuevo nodo", _collapsed: false });
      saveTree(updatedTree);
    }
  };

  const deleteNode = () => {
    const updatedTree = structuredClone(treeData);
    const remove = (nodes, path) => {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].name === path[0]) {
          if (path.length === 1) {
            nodes.splice(i, 1);
            return true;
          } else if (nodes[i].children) {
            const removed = remove(nodes[i].children, path.slice(1));
            if (removed && nodes[i].children.length === 0) {
              delete nodes[i].children;
            }
            return removed;
          }
        }
      }
      return false;
    };
    remove(updatedTree, selectedNodePath);
    saveTree(updatedTree);
    setSelectedNodePath([]);
  };

  useEffect(() => {
    loadTreesList();
  }, [user]);

  const dimensions = containerRef.current?.getBoundingClientRect() ?? {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.sidebar}>
        <h3>Mis árboles</h3>

        <div className={styles.searchInput}>
          <input
            type="text"
            placeholder="Buscar árbol..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <ul>
          {trees
            .filter((t) =>
              t.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((t) => (
              <li
                key={t.id}
                className={t.id === selectedTreeId ? styles.active : ""}
                onClick={() => {
                  setSelectedTreeId(t.id);
                  loadTreeData(t.id);
                }}
              >
                {t.name}
              </li>
            ))}
        </ul>

        <div className={styles.newTreeForm}>
          <input
            placeholder="Nuevo árbol"
            value={newTreeName}
            onChange={(e) => setNewTreeName(e.target.value)}
          />
          <button onClick={createNewTree}>Crear</button>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <button
            onClick={() => navigate("/tree")}
            style={{
              padding: "0.5rem",
              width: "100%",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Ir al visualizador
          </button>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <button
            onClick={createNewTree}
            style={{
              padding: "0.5rem",
              width: "100%",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Añadir nodo raíz
          </button>
        </div>
      </div>

      <div className={styles.viewer}>
        {treeData.length > 0 && (
          <Tree
            data={treeData}
            orientation="vertical"
            translate={{ x: dimensions.width / 2.5, y: 100 }}
            onNodeClick={handleNodeClick}
            collapsible={false}
            shouldCollapseNeighborNodes={false}
          />
        )}
      </div>

      <div className={styles.editorSidebar}>
        <h4>Editar nodo</h4>
        {selectedNodePath.length > 0 ? (
          <>
            <input
              value={newName || ""}
              onChange={(e) => setNewName(e.target.value)}
            />
            <div className={styles.buttons}>
              <button onClick={updateNodeName}>Guardar nombre</button>
              <button onClick={addChildNode}>Agregar hijo</button>
              <button onClick={deleteNode}>Eliminar nodo</button>
              <button onClick={() => setSelectedNodePath([])}>Cerrar</button>
            </div>
          </>
        ) : (
          <p>Selecciona un nodo para editarlo.</p>
        )}
      </div>
    </div>
  );
}
