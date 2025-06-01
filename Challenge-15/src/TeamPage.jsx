// src/TeamPage.jsx
import React from "react";
import useDocumentTitle from "./hooks/useDocumentTitle";

const TeamPage = () => {
  useDocumentTitle("Ventana de Team"); // Cambia el título de la ventana

  return (
    <div className="card">
      <h2>Ventana de Team</h2>
      <p>Conoce al equipo de trabajo.</p>
    </div>
  );
};

export default TeamPage;
