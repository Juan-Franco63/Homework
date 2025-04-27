import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";

function Home({ usuarioActual, setUsuarioActual }) {
  const navigate = useNavigate(); // Hook para redireccionar

  const manejarAgregarLibro = () => {
    navigate("/agregar-libro"); // Navegar a la página de agregar libro
  };

  return (
    <div>
      <Navbar usuarioActual={usuarioActual} setUsuarioActual={setUsuarioActual} />
      
      <h1>¡Bienvenido a la Biblioteca Virtual Interactiva!</h1>
      <p>Hola, <strong>{usuarioActual.displayName || usuarioActual.email}</strong>. Nos alegra verte por aquí.</p>
      <p>Desde el menú de arriba puedes:</p>
      <ul>
        <li>Pedir prestados libros en el Catálogo</li>
        <li>Revisar el historial de devoluciones</li>
        <li>Gestionar la cola de espera de libros</li>
      </ul>

      {/* Botón para agregar libros */}
      <p>Este boton es solo para agregar libros sin tener que acceder a firebase</p>
      <p>Es solo por comodidad</p>
      <button 
        onClick={manejarAgregarLibro} 
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginTop: "20px"
        }}
      >
        Agregar Nuevo Libro
      </button>

    </div>
  );
}

export default Home;
