import { useAuth } from '../Context/Authentification'
import { useNavigate } from 'react-router-dom'
import '../App.css'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="page">
      <h2>Dashboard</h2>
      <p>Bienvenido, {user.username}!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
export default Dashboard
