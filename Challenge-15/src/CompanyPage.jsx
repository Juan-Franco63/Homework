// src/CompanyPage.jsx
import React from "react";
import useDocumentTitle from "./hooks/useDocumentTitle";

const CompanyPage = () => {
  useDocumentTitle("Ventana de Company"); // Cambia el título de la ventana

  return (
    <div className="card">
      <h2>Ventana de Company</h2>
      <p>Conoce más sobre la empresa.</p>
    </div>
  );
};

export default CompanyPage;
