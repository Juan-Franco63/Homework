import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import styles from "./Reader.module.scss"; // Usamos CSS Module con SASS

const temas = [
  { id: 1, titulo: "Introducción a Estructuras", contenido: "Las estructuras de datos..." },
  { id: 2, titulo: "Pilas", contenido: "Una pila (stack) funciona con LIFO..." },
  { id: 3, titulo: "Colas", contenido: "Una cola (queue) funciona con FIFO..." },
  { id: 4, titulo: "Árboles", contenido: "Un árbol binario tiene nodos hijos..." },
];

export default function Reader() {
  const { pushToStack, popFromStack, stack, addToFavorites } = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  const temaActual = temas[currentIndex];

  useEffect(() => {
    pushToStack(temaActual);
  }, [currentIndex]);

  const siguiente = () => {
    if (currentIndex < temas.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const atras = () => {
    if (stack.length > 1) {
      popFromStack();
      setCurrentIndex(prev => prev - 1);
    }
  };

  const marcarFavorito = () => {
    addToFavorites(temaActual);
    alert("Agregado a favoritos 🎉");
  };

  return (
    <div className={styles.readerContainer}>
      <h2>{temaActual.titulo}</h2>
      <p>{temaActual.contenido}</p>

      <div className={styles.controls}>
        <button onClick={atras} disabled={currentIndex === 0}>⬅️ Atrás</button>
        <button onClick={marcarFavorito}>⭐ Favorito</button>
        <button onClick={siguiente} disabled={currentIndex === temas.length - 1}>➡️ Siguiente</button>
      </div>
    </div>
  );
}
