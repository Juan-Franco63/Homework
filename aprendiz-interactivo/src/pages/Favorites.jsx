import { useAppContext } from "../context/AppContext";
import styles from "./Favorites.module.scss";

export default function Favorites() {
  const { favorites } = useAppContext();

  return (
    <div className={styles.favoritesContainer}>
      <h2>⭐ Tus favoritos</h2>
      {favorites.length === 0 ? (
        <p>No has agregado ningún tema a favoritos todavía.</p>
      ) : (
        <ul className={styles.favoritesList}>
          {favorites.map((item, index) => (
            <li key={index} className={styles.favoriteItem}>
              <h3>{item.titulo}</h3>
              <p>{item.contenido}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
