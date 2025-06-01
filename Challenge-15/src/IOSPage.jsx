// src/IOSPage.jsx
import React from "react";
import useDocumentTitle from "./hooks/useDocumentTitle";

const IOSPage = () => {
  useDocumentTitle("Ventana de iOS Development"); // Cambia el título de la ventana

  return (
    <div className="card">
      <h2>Ventana de iOS Development</h2>
      <p>Desarrollo de aplicaciones para dispositivos Apple.</p>
    </div>
  );
};

export default IOSPage;
