// src/AppDevPage.jsx
import React from "react";
import useDocumentTitle from "./hooks/useDocumentTitle";

const AppDevPage = () => {
  useDocumentTitle("Ventana de App Development"); // Cambia el título de la ventana

  return (
    <div className="card">
      <h2>Ventana de App Development</h2>
      <p>Creación de aplicaciones móviles para todas las plataformas.</p>
    </div>
  );
};

export default AppDevPage;
