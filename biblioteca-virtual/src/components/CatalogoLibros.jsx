import { useState } from "react";
import { eliminarLibroCatalogo, agregarLibroPrestado, eliminarLibroPrestado, agregarLibroCatalogo, sacarDeCola, agregarACola, agregarAlHistorialDevoluciones } from '../firebase/firebaseService';

function CatalogoLibros({ catalogo, devoluciones, setDevoluciones, colas, setColas, librosPrestados, usuarioActual }) {
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const prestarLibro = async (libroId) => {
    const libroSeleccionado = catalogo.find(libro => libro.id === libroId);
    if (!libroSeleccionado) return;

    try {
      await eliminarLibroCatalogo(libroId);
      await agregarLibroPrestado({
        idOriginal: libroSeleccionado.id,
        titulo: libroSeleccionado.titulo,
        autor: libroSeleccionado.autor,
        usuario: usuarioActual.displayName || usuarioActual.email
      });
      alert(`¡${usuarioActual.displayName || usuarioActual.email} ha pedido el libro "${libroSeleccionado.titulo}"!`);
    } catch (error) {
      console.error("Error al prestar el libro:", error);
      alert("Hubo un problema al prestar el libro. Intenta de nuevo.");
    }
  };

  const devolverLibro = async (libroId) => {
    const libroADevolver = librosPrestados.find(libro => libro.id === libroId);
    if (!libroADevolver) return;

    try {
      await eliminarLibroPrestado(libroId);

      const colaDeLibro = colas[libroADevolver.idOriginal];

      if (colaDeLibro && colaDeLibro.usuarios.length > 0) {
        const siguienteUsuario = colaDeLibro.usuarios[0];
        alert(`¡El libro "${libroADevolver.titulo}" ahora está asignado automáticamente a ${siguienteUsuario}!`);

        await agregarLibroPrestado({
          idOriginal: libroADevolver.idOriginal,
          titulo: libroADevolver.titulo,
          autor: libroADevolver.autor,
          usuario: siguienteUsuario
        });

        await sacarDeCola(libroADevolver.idOriginal);
      } else {
        setDevoluciones(prev => [...prev, libroADevolver]);
        await agregarAlHistorialDevoluciones({
          idOriginal: libroADevolver.idOriginal,
          titulo: libroADevolver.titulo,
          autor: libroADevolver.autor,
          usuarioQueDevolvio: usuarioActual.displayName || usuarioActual.email,
          fechaDevolucion: new Date().toISOString()
        });
      }

    } catch (error) {
      console.error("Error al devolver el libro:", error);
      alert("Hubo un problema al devolver el libro.");
    }
  };

  const entrarEnCola = async (libroIdOriginal, tituloLibro) => {
    try {
      await agregarACola(libroIdOriginal, usuarioActual.displayName || usuarioActual.email, tituloLibro);
      alert(`¡${usuarioActual.displayName || usuarioActual.email} ha sido agregado a la cola de espera para "${tituloLibro}"!`);
    } catch (error) {
      if (error.message.includes("ya está en la cola")) {
        alert("Ya estás en la cola de espera para este libro.");
      } else {
        console.error("Error al entrar en cola:", error);
        alert("Hubo un problema al entrar en cola.");
      }
    }
  };

  const catalogoFiltrado = catalogo
    .filter(libro => 
      libro.titulo.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
      libro.autor.toLowerCase().includes(textoBusqueda.toLowerCase())
    )
    .sort((a, b) => a.titulo.localeCompare(b.titulo));

  return (
    <div>
      <h2>Catálogo de Libros</h2>

      <input 
        type="text"
        placeholder="Buscar por título o autor..."
        value={textoBusqueda}
        onChange={(e) => setTextoBusqueda(e.target.value)}
        style={{
          marginBottom: "20px",
          padding: "8px",
          width: "300px",
          borderRadius: "8px",
          border: "1px solid gray"
        }}
      />

      <h3>Libros Disponibles:</h3>
      <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "20px" }}>
        <ul>
          {catalogoFiltrado.length > 0 ? (
            catalogoFiltrado.map(libro => (
              <li key={libro.id}>
                {libro.titulo} - {libro.autor}
                <button onClick={() => prestarLibro(libro.id)}>Prestar</button>
              </li>
            ))
          ) : (
            <p>No hay libros disponibles.</p>
          )}
        </ul>
      </div>

      <h3>Libros Prestados:</h3>
      <ul>
        {librosPrestados.length > 0 ? (
          librosPrestados.map(libro => (
            <li key={libro.id}>
              {libro.titulo} - Prestado a: {libro.usuario}
              {libro.usuario === (usuarioActual.displayName || usuarioActual.email) ? (
                <button onClick={() => devolverLibro(libro.id)}>Devolver</button>
              ) : (
                <button onClick={() => entrarEnCola(libro.idOriginal, libro.titulo)}>Entrar en cola de espera</button>
              )}
            </li>
          ))
        ) : (
          <p>No hay libros prestados actualmente.</p>
        )}
      </ul>
    </div>
  );
}

export default CatalogoLibros;
