// src/AboutPage.jsx
import React from "react";
import useDocumentTitle from "./hooks/useDocumentTitle";

const AboutPage = () => {
  useDocumentTitle("Ventana de About");

  return (
    <div className="card">
      <h2>Ventana de About</h2>  {/* Título debajo del título principal */}
      <p>Conoce más sobre nuestra empresa.</p>
    </div>
  );
};

export default AboutPage;
