import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="page">
      <h2>Dashboard</h2>
      <p>Has iniciado sesión exitosamente.</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
      <Link to="/crud"><button>Ir al CRUD</button></Link>
    </div>
  );
};

export default Dashboard;

  