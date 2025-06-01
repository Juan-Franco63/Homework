import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>404 – Página no encontrada</h1>
      <p>La ruta que intentas visitar no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}
