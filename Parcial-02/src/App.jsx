import React from "react";
import ClienteForm from "./Funciones/Clientes/ClienteForm";
import ClienteViewer from "./componentes/ClienteViewer";
import ListaClientes from "./componentes/ListaClientes";

const App = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          backgroundColor: "#f1f1f1",
          padding: "1rem",
          borderRight: "1px solid #ccc",
        }}
      >
        <h2>Clientes</h2>
        <ListaClientes />
      </div>

      {/* Contenido principal */}
      <div style={{ flex: 1, padding: "2rem" }}>
        <h1>Gestión de Clientes</h1>
        <ClienteForm />
        <ClienteViewer />
      </div>
    </div>
  );
};

export default App;
