// src/pages/Register.jsx
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startRegisterWithEmailPassword } from '../store/thunks'
import { Link } from 'react-router-dom';


const Register = () => {
  const dispatch = useDispatch()
  const { status, errorMessage } = useSelector((state) => state.auth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')

  const handleRegister = (e) => {
    e.preventDefault()

    // Enviar la info al thunk
    dispatch(startRegisterWithEmailPassword({ email, password, displayName }))
  }

  return (
    <div className="page">
      <h2>Crear cuenta</h2>
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Nombre"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={status === 'checking'}>
          {status === 'checking' ? 'Creando...' : 'Registrarse'}
        </button>
        <Link to="/"><button type="button">Volver al Inicio</button></Link>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </div>
  );
  
}

export default Register
