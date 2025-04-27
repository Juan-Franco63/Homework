import { useEffect, useState } from "react";
import { suscribirHistorialDevoluciones, agregarLibroCatalogo, eliminarHistorialDevolucion } from "../firebase/firebaseService";

function HistorialDevoluciones({ setCatalogo }) {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const unsubscribe = suscribirHistorialDevoluciones(setHistorial);
    return () => unsubscribe();
  }, []);

  const rehacerDevolucion = async (libro) => {
    try {
      // Primero agregar el libro nuevamente al catálogo
      await agregarLibroCatalogo({
        titulo: libro.titulo,
        autor: libro.autor
      });

      // Después eliminarlo del historial
      await eliminarHistorialDevolucion(libro.id);

      console.log(`Libro "${libro.titulo}" regresado al catálogo y eliminado del historial.`);

    } catch (error) {
      console.error("Error al rehacer devolución:", error);
      alert("Hubo un problema al rehacer la devolución.");
    }
  };

  return (
    <div>
      <h2>Historial de Devoluciones</h2>

      {historial.length > 0 ? (
        <ul>
          {historial.map(libro => (
            <li key={libro.id}>
              {libro.titulo} - {libro.autor}
              <button onClick={() => rehacerDevolucion(libro)}>Rehacer Devolución</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay libros devueltos todavía.</p>
      )}
    </div>
  );
}

export default HistorialDevoluciones;
