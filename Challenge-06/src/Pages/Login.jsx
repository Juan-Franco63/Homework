import { useAuth } from '../Context/Authentification'
import { useNavigate, Link } from 'react-router-dom'
import '../App.css'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = () => {
    login("Juan")
    navigate("/dashboard")
  }

  return (
    <div className="page">
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
      <Link to="/"><button>Volver al Home</button></Link>
    </div>
  )
}
export default Login
