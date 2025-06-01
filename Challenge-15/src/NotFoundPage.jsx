// src/NotFoundPage.jsx
import React from "react";
import useDocumentTitle from "./hooks/useDocumentTitle";

const NotFoundPage = () => {
  useDocumentTitle("Página No Encontrada"); // Cambia el título de la ventana

  return (
    <div className="card">
      <h2>Página No Encontrada</h2>
      <p>La página que estás buscando no existe.</p>
    </div>
  );
};

export default NotFoundPage;
