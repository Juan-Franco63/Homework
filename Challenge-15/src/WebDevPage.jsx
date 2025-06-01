// src/WebDevPage.jsx
import React from "react";
import useDocumentTitle from "./hooks/useDocumentTitle";

const WebDevPage = () => {
  useDocumentTitle("Ventana de Web Development"); // Cambia el título de la ventana

  return (
    <div className="card">
      <h2>Ventana de Web Development</h2>
      <p>Desarrollamos sitios web modernos y funcionales.</p>
    </div>
  );
};

export default WebDevPage;
