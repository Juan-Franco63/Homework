// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Reader from "./pages/Reader";
import Favorites from "./pages/Favorites";
import History from "./pages/History";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import TopicPlayer from "./components/TopicPlayer";
import TreeViewer from "./components/TreeViewer";
import FirestoreTree from "./components/FirestoreTree";
import GraphViewer from "./components/GraphViewer";
<<<<<<< Updated upstream
import VisitedCitiesPage from "./pages/VisitedCitiesPage";

// ✅ Importa el proveedor de contexto
import { VisitedCitiesProvider } from "./context/VisitedCitiesContext";
=======
import VisitedCitiesPage from "./pages/VisitedCitiesPage"; // NUEVO
import { VisitedCitiesProvider } from "./context/VisitedCitiesContext"; // NUEVO
>>>>>>> Stashed changes

export default function App() {
  return (
    <VisitedCitiesProvider>
      <Router>
        <Header />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas privadas */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/reader"
            element={
              <PrivateRoute>
                <Reader />
              </PrivateRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route
            path="/history"
            element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            }
          />
          <Route
            path="/playlist"
            element={
              <PrivateRoute>
                <TopicPlayer />
              </PrivateRoute>
            }
          />
          <Route
            path="/tree"
            element={
              <PrivateRoute>
                <TreeViewer />
              </PrivateRoute>
            }
          />
          <Route
            path="/tree-editor"
            element={
              <PrivateRoute>
                <FirestoreTree />
              </PrivateRoute>
            }
          />
          <Route
<<<<<<< Updated upstream
            path="/graphs"
=======
            path="/graph"
>>>>>>> Stashed changes
            element={
              <PrivateRoute>
                <GraphViewer />
              </PrivateRoute>
            }
          />
          <Route
            path="/visited"
            element={
              <PrivateRoute>
                <VisitedCitiesPage />
              </PrivateRoute>
            }
          />

          {/* Ruta no encontrada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </VisitedCitiesProvider>
  );
}
