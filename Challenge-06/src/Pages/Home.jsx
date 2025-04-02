import { Link } from 'react-router-dom'
import '../App.css'

const Home = () => {
  return (
    <div className="page">
      <h2>Home (Ruta Pública)</h2>
      <Link to="/login"><button>Ir a Login</button></Link>
      <Link to="/dashboard"><button>Ir a Dashboard</button></Link>
    </div>
  )
}
export default Home
