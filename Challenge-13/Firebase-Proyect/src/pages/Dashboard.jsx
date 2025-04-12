import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { auth } from '../firebase/config';
import { useNavigate, Link } from 'react-router-dom';

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

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <Link to="/crud">
          <button>Ir al CRUD</button>
        </Link>
        <Link to="/chat">
          <button>Ir al Chat</button>
        </Link>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export default Dashboard;
