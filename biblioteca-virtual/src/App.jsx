import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import { suscribirCatalogo, suscribirLibrosPrestados, suscribirColas } from './firebase/firebaseService';
import AgregarLibro from './components/AgregarLibro'; 
import CatalogoLibros from './components/CatalogoLibros';
import HistorialDevoluciones from './components/HistorialDevoluciones';
import ColaEspera from './components/ColaEspera';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Home from './components/Home'; 

import './App.css'; 

function App() {
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [loading, setLoading] = useState(true);

  const [catalogo, setCatalogo] = useState([]);
  const [devoluciones, setDevoluciones] = useState([]);
  const [colas, setColas] = useState({});
  const [librosPrestados, setLibrosPrestados] = useState([]);

  // Detectar cambios en la sesión del usuario
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuarioActual(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Suscribirse en tiempo real a catálogo y libros prestados
  useEffect(() => {
    const unsubCatalogo = suscribirCatalogo(setCatalogo);
    const unsubPrestados = suscribirLibrosPrestados(setLibrosPrestados);
    const unsubColas = suscribirColas(setColas);
  
    return () => {
      unsubCatalogo();
      unsubPrestados();
      unsubColas();
    };
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Router>
      <div>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login setUsuarioActual={setUsuarioActual} />} />
          <Route path="/register" element={<Register setUsuarioActual={setUsuarioActual} />} />

          {/* Rutas privadas */}
          {usuarioActual ? (
            <>
              <Route path="/home" element={
                <Home usuarioActual={usuarioActual} setUsuarioActual={setUsuarioActual} />
              } />

              <Route path="/catalogo" element={
                <>
<Navbar usuarioActual={usuarioActual} setUsuarioActual={setUsuarioActual} />
<CatalogoLibros 
  catalogo={catalogo}
  devoluciones={devoluciones}
  setDevoluciones={setDevoluciones}
  colas={colas}
  setColas={setColas}
  librosPrestados={librosPrestados}
  usuarioActual={usuarioActual}
/>

                </>
              } />

              <Route path="/historial" element={
                <>
                  <Navbar usuarioActual={usuarioActual} setUsuarioActual={setUsuarioActual} />
                  <HistorialDevoluciones 
                    devoluciones={devoluciones}
                    setDevoluciones={setDevoluciones}
                    setCatalogo={setCatalogo} // Este se puede eliminar después si migramos historial a Firestore
                  />
                </>
              } />

              <Route path="/colas" element={
                <>
                  <Navbar usuarioActual={usuarioActual} setUsuarioActual={setUsuarioActual} />
                  <ColaEspera 
                    colas={colas}
                    setColas={setColas}
                    catalogo={catalogo}
                    setCatalogo={setCatalogo}
                    setLibrosPrestados={setLibrosPrestados}
                  />
                </>
              } />
              {/* Ruta para agregar libros al catálogo */}
              <Route path="/agregar-libro" element={<AgregarLibro />} />
              {/* Redirigir / a /home */}
              <Route path="/" element={<Navigate to="/home" replace />} />
            </>
          ) : (
            // Si no está logueado, redirigir cualquier ruta a /login
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
