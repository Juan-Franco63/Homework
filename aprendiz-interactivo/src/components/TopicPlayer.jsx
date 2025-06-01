import { useEffect, useRef, useState } from "react";
import { DoublyLinkedList } from "../utils/DoublyLinkedList";
import styles from "./TopicPlayer.module.scss";

import { useAuth } from "../context/AuthContext";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// Lista de temas
const temas = [
  { id: 1, titulo: "Tema 1", contenido: "Contenido del tema 1" },
  { id: 2, titulo: "Tema 2", contenido: "Contenido del tema 2" },
  { id: 3, titulo: "Tema 3", contenido: "Contenido del tema 3" },
];

export default function TopicPlayer() {
  const listaRef = useRef(new DoublyLinkedList());
  const [nodoActual, setNodoActual] = useState(null);
  const { user } = useAuth();

  // Guardar el progreso actual en Firestore
  const guardarProgreso = async (temaId) => {
    if (!user) return;
    const ref = doc(db, "playlistProgress", user.uid);
    await setDoc(ref, { currentId: temaId });
  };

  // Cargar el último progreso desde Firestore
  useEffect(() => {
    // Construir lista doblemente enlazada una sola vez
    temas.forEach((tema) => listaRef.current.append(tema));

    const cargarProgreso = async () => {
      if (!user) return;

      const ref = doc(db, "playlistProgress", user.uid);
      const snap = await getDoc(ref);

      let temaInicial = temas[0];
      if (snap.exists()) {
        const { currentId } = snap.data();
        const encontrado = temas.find((t) => t.id === currentId);
        if (encontrado) temaInicial = encontrado;
      }

      // Buscar el nodo correspondiente en la lista
      let actual = listaRef.current.getHead();
      while (actual && actual.data.id !== temaInicial.id) {
        actual = actual.next;
      }

      setNodoActual(actual);
    };

    cargarProgreso();
  }, [user]);

  const siguiente = () => {
    if (nodoActual?.next) {
      const nextNode = nodoActual.next;
      setNodoActual(nextNode);
      guardarProgreso(nextNode.data.id);
    }
  };

  const anterior = () => {
    if (nodoActual?.prev) {
      const prevNode = nodoActual.prev;
      setNodoActual(prevNode);
      guardarProgreso(prevNode.data.id);
    }
  };

  if (!nodoActual) return <p>Cargando tema...</p>;

  return (
    <div className={styles.playerContainer}>
      <h2>{nodoActual.data.titulo}</h2>
      <p>{nodoActual.data.contenido}</p>

      <div className={styles.controls}>
        <button onClick={anterior} disabled={!nodoActual.prev}>
          Anterior
        </button>
        <button onClick={siguiente} disabled={!nodoActual.next}>
          Siguiente
        </button>
      </div>
    </div>
  );
}
