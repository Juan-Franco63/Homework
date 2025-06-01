// src/HomePage.jsx
import React from "react";
import useDocumentTitle from "./hooks/useDocumentTitle";

const HomePage = () => {
  useDocumentTitle("Ventana de Home");

  return (
    <div className="card">
      <h2>Ventana de Home</h2>  {/* Título debajo del título principal */}
      <p>Bienvenido a la página de inicio.</p>
    </div>
  );
};

export default HomePage;
