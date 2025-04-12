import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  const { status } = useSelector(state => state.auth);
  const location = useLocation();

  const isAuth = status === 'authenticated';
  const isLoginOrRegister = location.pathname === '/login' || location.pathname === '/register';

  return (isAuth && isLoginOrRegister)
    ? <Navigate to="/dashboard" />
    : children;
};

export default PublicRoute;
