
import React from "react";
import { useSelector } from "react-redux";

const ListaClientes = () => {
  const clientes = useSelector((state) => state.clientes.clientes);

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", marginTop: "1rem" }}>
      <h3>Lista de Clientes</h3>
      <ul>
        {clientes.map((cliente, index) => (
          <li key={index}>{cliente.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListaClientes;
