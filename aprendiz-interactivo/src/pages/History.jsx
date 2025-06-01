import { useAppContext } from "../context/AppContext";
import styles from "./History.module.scss";

export default function History() {
  const { stack } = useAppContext();

  return (
    <div className={styles.historyContainer}>
      <h2> Historial de navegación</h2>
      {stack.length === 0 ? (
        <p>No hay elementos en el historial.</p>
      ) : (
        <ul className={styles.historyList}>
          {[...stack].reverse().map((item, index) => (
            <li key={index} className={styles.historyItem}>
              <h3>{item.titulo}</h3>
              <p>{item.contenido}</p>
              <span className={styles.level}>Posición #{stack.length - index}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
