import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { agregarCliente } from "./clienteSlice";



const ClienteForm = () => {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("consulta");
  const [texto, setTexto] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !texto) return;

    dispatch(agregarCliente({ nombre, tipo, texto }));
    setTexto("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}
    >
      <input
        type="text"
        placeholder="Nombre del cliente"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        style={{ padding: "0.5rem", fontSize: "1rem" }}
      />
      <select
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        style={{ padding: "0.5rem", fontSize: "1rem" }}
      >
        <option value="consulta">Consulta</option>
        <option value="reclamo">Reclamo</option>
      </select>
      <textarea
        placeholder="Escribe la consulta o reclamo..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        style={{
          minHeight: "120px",
          padding: "0.5rem",
          fontSize: "1rem",
          resize: "vertical",
        }}
      />

      <button type="submit" style={{ padding: "0.5rem", fontSize: "1rem" }}>
        Agregar
      </button>
    </form>
  );
};

export default ClienteForm;
