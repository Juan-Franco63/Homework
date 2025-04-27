import { useState } from "react";
import { agregarLibroCatalogo } from "../firebase/firebaseService";
import { useNavigate } from "react-router-dom";

function AgregarLibro() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const navigate = useNavigate(); // Hook para navegación

  const manejarSubmit = async (e) => {
    e.preventDefault();

    if (!titulo.trim() || !autor.trim()) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      await agregarLibroCatalogo({ titulo, autor });
      alert("¡Libro agregado exitosamente al catálogo!");
      setTitulo("");
      setAutor("");
    } catch (error) {
      console.error("Error al agregar libro:", error);
      alert("Hubo un problema al agregar el libro.");
    }
  };

  const manejarVolverDashboard = () => {
    navigate("/home");
  };

  return (
    <div>
      <h2>Agregar Nuevo Libro al Catálogo</h2>

      {/* Mensaje de advertencia */}
      <p style={{ color: "red", fontWeight: "bold" }}>
        Esta sección es solo para agregar libros al catálogo. 
        No forma parte del flujo normal de préstamo y devolución.
      </p>

      <form onSubmit={manejarSubmit} style={{ marginTop: "20px" }}>
        <div>
          <label>Título del Libro:</label><br />
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Autor del Libro:</label><br />
          <input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          />
        </div>

        <button 
          type="submit"
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Agregar Libro
        </button>
      </form>

      {/* Botón para volver al Dashboard */}
      <div style={{ marginTop: "30px" }}>
        <button 
          onClick={manejarVolverDashboard}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28A745",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Volver al Dashboard
        </button>
      </div>

    </div>
  );
}

export default AgregarLibro;
