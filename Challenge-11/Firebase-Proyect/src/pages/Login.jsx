import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase/config";
import { Link } from 'react-router-dom';
import { login, logout, checkingCredentials } from '../store/authSlice';
import { startGoogleSignIn } from '../store/thunks';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { status, errorMessage, displayName, photoUrl, email: userEmail } = useSelector((state) => state.auth);
  const loading = status === 'checking';

  const handleLogin = async () => {
    dispatch(checkingCredentials());
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      dispatch(login({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
        photoUrl: user.photoURL || ""
      }));
    } catch (err) {
      dispatch(logout({ errorMessage: err.message }));
    }
  };

  const handleLogout = () => {
    auth.signOut();
    dispatch(logout());
  };

  return (
    <div className="page">
      <h2>Login</h2>
  
      {status === 'authenticated' ? (
        <>
          <p>Bienvenido, {displayName || userEmail}</p>
          {photoUrl && <img src={photoUrl} alt="Foto de perfil" style={{ width: 50, borderRadius: '50%' }} />}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
          <button onClick={() => dispatch(startGoogleSignIn())} disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar con Google'}
          </button>
          <Link to="/"><button type="button">Volver al Inicio</button></Link>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </>
      )}
    </div>
  );
};

export default Login;
