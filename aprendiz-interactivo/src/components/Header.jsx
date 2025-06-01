import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../firebase/auth";
import styles from "./Header.module.scss";

export default function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">Aprendiz Interactivo</Link>
      </div>

      <nav className={styles.nav}>
        {user ? (
          <>
            <span className={styles.user}>Sesión: {user.email}</span>
            <Link to="/reader">Lectura</Link>
            <Link to="/favorites">Favoritos</Link>
            <Link to="/history">Historial</Link>
            <Link to="/playlist">Reproductor</Link>
            <Link to="/dashboard">Panel</Link>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar sesión</Link>
            <Link to="/register">Registrarse</Link>
          </>
        )}
      </nav>
    </header>
  );
}
