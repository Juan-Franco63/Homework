import { createContext, useContext, useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "./AuthContext"; // 👈 importa el usuario

const AppContext = createContext();

export function AppProvider({ children }) {
  const [stack, setStack] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth(); // 👈 acceso al usuario actual

  // Cargar favoritos solo si el usuario está autenticado
  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) return; // ⛔ evita llamada sin sesión

      try {
        const favsSnap = await getDocs(collection(db, "favorites"));
        const favs = favsSnap.docs.map(doc => doc.data());
        setFavorites(favs);
      } catch (error) {
        console.error("Error cargando favoritos:", error);
      }
    };

    loadFavorites();
  }, [user]); // 👈 se ejecuta solo cuando hay usuario

  const pushToStack = (page) => {
    setStack(prev => [...prev, page]);
  };

  const popFromStack = () => {
    setStack(prev => prev.slice(0, -1));
  };

  const addToFavorites = async (item) => {
    if (!user) return; // ⛔ evita guardar sin sesión

    try {
      await addDoc(collection(db, "favorites"), item);
      setFavorites(prev => [...prev, item]);
    } catch (error) {
      console.error("Error agregando favorito:", error);
    }
  };

  const contextValue = {
    stack,
    pushToStack,
    popFromStack,
    favorites,
    addToFavorites,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
