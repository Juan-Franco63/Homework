import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  const { status } = useSelector(state => state.auth);

  return (status !== 'authenticated')
    ? children
    : <Navigate to="/dashboard" />;
};

export default PublicRoute;
