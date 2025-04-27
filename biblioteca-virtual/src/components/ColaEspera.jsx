function ColaEspera({ colas }) {
  return (
    <div>
      <h2>Colas de Espera</h2>

      {Object.keys(colas).length > 0 ? (
        <ul>
          {Object.entries(colas).map(([libroId, datos]) => (
            <li key={libroId}>
              <strong>{datos.titulo || "Título desconocido"}</strong> (ID: {libroId})
              <ul>
                {datos.usuarios.length > 0 ? (
                  datos.usuarios.map(usuario => (
                    <li key={usuario}>{usuario}</li>
                  ))
                ) : (
                  <li>No hay usuarios en espera.</li>
                )}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay usuarios en cola.</p>
      )}
    </div>
  );
}

export default ColaEspera;
