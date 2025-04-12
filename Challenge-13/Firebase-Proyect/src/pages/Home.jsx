import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="page">
      <h1>Bienvenido a la App</h1>
      <p>Selecciona una opción para continuar:</p>
      <Link to="/login"><button>Iniciar Sesión</button></Link>
      <Link to="/register"><button>Registrarse</button></Link>
    </div>
  );
};

export default Home;
