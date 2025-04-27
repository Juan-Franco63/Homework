import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate, Link } from 'react-router-dom';

function Navbar({ usuarioActual, setUsuarioActual }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUsuarioActual(null);
      navigate('/login');
    } catch (error) {
      alert('Error al cerrar sesión.');
    }
  };

  return (
    <nav>
      <h3>Bienvenido: {usuarioActual.email}</h3>
      <Link to="/home">Inicio</Link>{" | "}
      <Link to="/catalogo">Catálogo</Link>{" | "}
      <Link to="/historial">Historial</Link>{" | "}
      <Link to="/colas">Colas</Link>{" | "}
      <button onClick={handleLogout}>Cerrar sesión</button>
    </nav>
  );
}

export default Navbar;
