// src/ServicesPage.jsx
import React from "react";
import useDocumentTitle from "./hooks/useDocumentTitle";

const ServicesPage = () => {
  useDocumentTitle("Ventana de Services"); // Cambia el título de la ventana

  return (
    <div className="card">
      <h2>Ventana de Services</h2>
      <p>Estos son nuestros servicios.</p>
    </div>
  );
};

export default ServicesPage;
