// src/AndroidPage.jsx
import React from "react";
import useDocumentTitle from "./hooks/useDocumentTitle";

const AndroidPage = () => {
  useDocumentTitle("Ventana de Android Development"); // Cambia el título de la ventana

  return (
    <div className="card">
      <h2>Ventana de Android Development</h2>
      <p>Desarrollo de aplicaciones Android con las mejores prácticas.</p>
    </div>
  );
};

export default AndroidPage;
