import { useSelector, useDispatch } from "react-redux";
import { siguienteCliente, anteriorCliente } from "../Funciones/Clientes/clienteSlice";

export default function ClienteViewer() {
  const { clientes, clienteActual } = useSelector((state) => state.clientes);
  const dispatch = useDispatch();

  if (clientes.length === 0) return <p>No hay clientes.</p>;

  const cliente = clientes[clienteActual];

  return (
    <div className="p-4 border rounded mt-4">
      <h2>Cliente: {cliente.nombre}</h2>
      <h3>Consultas:</h3>
      <ul>
        {cliente.consultas.getAll().map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
      <h3>Reclamos:</h3>
      <ul>
        {cliente.reclamos.getAll().map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
      <button onClick={() => dispatch(anteriorCliente())}>Anterior</button>
      <button onClick={() => dispatch(siguienteCliente())}>Siguiente</button>
    </div>
  );
}
