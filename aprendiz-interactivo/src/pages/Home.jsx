import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../firebase/auth";
import styles from "./Home.module.scss";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (error) {
      alert("Error al cerrar sesión");
    }
  };

  return (
    <div className={styles.homeContainer}>
      <h1>Bienvenido a Aprendiz Interactivo</h1>

      {user ? (
        <div className={styles.userInfo}>
          <p>Bienvenido, <strong>{user.email}</strong></p>
        </div>
      ) : (
        <div className={styles.authButtons}>
          <Link to="/login"><button>Iniciar sesión</button></Link>
          <Link to="/register"><button>Registrarse</button></Link>
        </div>
      )}

      <hr />

      <nav className={styles.navLinks}>
        <h3>Navegación</h3>
        <ul>
          <li><Link to="/reader">Comenzar lectura</Link></li>
          <li><Link to="/favorites">Mis favoritos</Link></li>
          <li><Link to="/history">Historial</Link></li>
          <li><Link to="/playlist">Reproductor de temas</Link></li>
          <li><Link to="/dashboard">Ir al panel de usuario</Link></li>


        </ul>
      </nav>
    </div>
  );
}
