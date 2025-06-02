// src/pages/Dashboard.jsx
import { Link } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext";
import styles from "./Dashboard.module.scss";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className={styles.dashboardContainer}>
      <h1>Panel de usuario</h1>
      <p>Bienvenido, <strong>{user?.email}</strong></p>

      <div className={styles.cards}>
        <Link to="/reader" className={styles.card}>
          <h3>Lectura</h3>
          <p>Explora los temas secuencialmente.</p>
        </Link>

        <Link to="/favorites" className={styles.card}>
          <h3>Favoritos</h3>
          <p>Consulta los temas que marcaste como favoritos.</p>
        </Link>

        <Link to="/history" className={styles.card}>
          <h3>Historial</h3>
          <p>Revisa el recorrido de navegación que has hecho.</p>
        </Link>

        <Link to="/playlist" className={styles.card}>
          <h3>Reproductor</h3>
          <p>Accede a los temas como si fuera una lista de estudio.</p>
        </Link>

        <Link to="/tree" className={styles.card}>
          <h3>Árbol de contenidos</h3>
          <p>Visualiza la jerarquía de estructuras de datos.</p>
        </Link>

        <Link to="/tree-editor" className={styles.card}>
          <h3>Editor del árbol</h3>
          <p>Agrega o edita nodos en tu propio árbol interactivo.</p>
        </Link>

<<<<<<< Updated upstream
        <Link to="/graphs" className={styles.card}>
          <h3>Visualizador de grafos</h3>
          <p>Explora y edita tus grafos interactivos.</p>
        </Link>

        <Link to="/visited" className={styles.card}>
          <h3>Ciudades registradas</h3>
          <p>Agrega o edita tu lista de ciudades independientes.</p>
=======
        <Link to="/graph" className={styles.card}>
          <h3>Centro de ciudades</h3>
          <p>Administra las ciudades y sus conexiones en un grafo interactivo.</p>
        </Link>

        <Link to="/visited" className={styles.card}>
          <h3>Ciudades visitadas</h3>
          <p>Consulta la lista de ciudades que has explorado recientemente.</p>
>>>>>>> Stashed changes
        </Link>
      </div>
    </div>
  );
}
