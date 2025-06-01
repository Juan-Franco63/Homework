// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import TeamPage from "./TeamPage";
import CompanyPage from "./CompanyPage";
import ServicesPage from "./ServicesPage";
import WebDevPage from "./WebDevPage";
import AppDevPage from "./AppDevPage";
import AndroidPage from "./AndroidPage";
import IOSPage from "./IOSPage";

const App = () => {
  return (
    <Router>
      <div style={{ display: "flex", height: "100vh" }}>
        {/* Barra lateral */}
        <Sidebar />

        {/* Contenido principal */}
        <div className="main-content" style={{ flex: 1, padding: "20px", overflowY: "auto", display: "flex", flexDirection: "column" }}>
          {/* Título principal */}
          <h1>Welcome to the React Sidebar App</h1>
          <br />

          {/* Rutas y contenido */}
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/team" element={<TeamPage />} />
            <Route path="/about/company" element={<CompanyPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/web" element={<WebDevPage />} />
            <Route path="/services/app" element={<AppDevPage />} />
            <Route path="/services/app/android" element={<AndroidPage />} />
            <Route path="/services/app/ios" element={<IOSPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
