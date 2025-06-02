import { useVisitedCities } from "../context/VisitedCitiesContext";
import { useState } from "react";
import styles from "./VisitedCitiesPage.module.scss";

export default function VisitedCitiesPage() {
  const {
    visitedCities,
    addCity,
    removeCity,
    clearCities,
    editCityName,
  } = useVisitedCities();

  const [newCityName, setNewCityName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");

  const handleAddCity = () => {
    const trimmed = newCityName.trim();
    if (!trimmed) return;
    addCity({ id: Date.now().toString(), name: trimmed });
    setNewCityName("");
  };

  const handleEditSave = (id) => {
    const trimmed = editedName.trim();
    if (!trimmed) return;
    editCityName(id, trimmed);
    setEditingId(null);
    setEditedName("");
  };

  return (
    <div className={styles.visitedContainer}>
      <h1>Ciudades Registradas</h1>

      <div className={styles.addForm}>
        <input
          type="text"
          placeholder="Nombre de la ciudad"
          value={newCityName}
          onChange={(e) => setNewCityName(e.target.value)}
        />
        <button onClick={handleAddCity}>Registrar ciudad</button>
      </div>

      {visitedCities.length === 0 ? (
        <p>No hay ciudades registradas.</p>
      ) : (
        <>
          <ul className={styles.cityList}>
            {visitedCities.map((city, idx) => (
              <li key={idx} className={styles.cityItem}>
                {editingId === city._id ? (
                  <>
                    <input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                    <button onClick={() => handleEditSave(city._id)}>Guardar</button>
                    <button onClick={() => setEditingId(null)}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <span>{city.name}</span>
                    <small>{new Date(city.visitedAt).toLocaleString()}</small>
                    <button
                      onClick={() => {
                        setEditingId(city._id);
                        setEditedName(city.name);
                      }}
                    >
                      Editar
                    </button>
                    <button onClick={() => removeCity(city._id)}>Eliminar</button>
                  </>
                )}
              </li>
            ))}
          </ul>
          <button className={styles.clearButton} onClick={clearCities}>
            Limpiar toda la lista
          </button>
        </>
      )}
    </div>
  );
}
