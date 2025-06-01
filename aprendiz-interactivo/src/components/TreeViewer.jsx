import { useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../context/AuthContext";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import styles from "./FirestoreTree.module.scss";
import { useNavigate } from "react-router-dom";

export default function TreeViewer() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [trees, setTrees] = useState([]);
  const [selectedTreeId, setSelectedTreeId] = useState(null);
  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
      setTreeData(snap.data().tree || []);
      setNewName(snap.data().name || "");
    }
  };

  const duplicateTree = async () => {
    if (!selectedTreeId || !treeData.length) return;
    const original = trees.find((t) => t.id === selectedTreeId);
    const name = `Copia de ${original?.name || "árbol"}`;

    setLoading(true);
    const newDoc = await addDoc(treesRef, {
      name,
      tree: structuredClone(treeData),
    });
    await loadTreesList();
    setSelectedTreeId(newDoc.id);
    loadTreeData(newDoc.id);
    setLoading(false);
  };

  const renameTree = async () => {
    if (!newName.trim() || !selectedTreeId) return;
    const ref = doc(db, "trees", user.uid, "myTrees", selectedTreeId);
    await updateDoc(ref, { name: newName });
    loadTreesList();
  };

  const deleteTree = async () => {
    if (!selectedTreeId) return;
    const confirm = window.confirm("¿Estás seguro de eliminar este árbol?");
    if (!confirm) return;

    const ref = doc(db, "trees", user.uid, "myTrees", selectedTreeId);
    await deleteDoc(ref);
    await loadTreesList();
    setSelectedTreeId(null);
    setTreeData([]);
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
        <h3>Visualizar árboles</h3>

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

        {selectedTreeId && (
          <div style={{ marginTop: "1rem" }}>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Renombrar árbol"
              style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
            />
            <button onClick={renameTree} style={buttonStyle}>
              Guardar nombre
            </button>
            <button
              onClick={duplicateTree}
              style={{ ...buttonStyle, backgroundColor: "#28a745" }}
            >
              Duplicar árbol
            </button>
            <button
              onClick={deleteTree}
              style={{ ...buttonStyle, backgroundColor: "#dc3545" }}
            >
              Eliminar árbol
            </button>
          </div>
        )}

        <div style={{ marginTop: "2rem" }}>
          <button
            onClick={() => navigate("/tree-editor")} // ✅ Ruta corregida aquí
            style={{ ...buttonStyle, backgroundColor: "#007bff" }}
          >
            Ir al editor
          </button>
        </div>
      </div>

      <div className={styles.viewer}>
        {treeData.length > 0 && (
          <Tree
            data={treeData}
            orientation="vertical"
            translate={{ x: dimensions.width / 2.5, y: 100 }}
            collapsible={true}
          />
        )}
      </div>
    </div>
  );
}

const buttonStyle = {
  width: "100%",
  padding: "0.5rem",
  marginBottom: "0.5rem",
  border: "none",
  borderRadius: "4px",
  color: "white",
  backgroundColor: "#2e86de",
  cursor: "pointer",
};
