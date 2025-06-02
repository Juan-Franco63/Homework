import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const VisitedCitiesContext = createContext();

export function VisitedCitiesProvider({ children }) {
  const { user } = useAuth();
  const [visitedCities, setVisitedCities] = useState([]);

  useEffect(() => {
    const fetchVisitedCities = async () => {
      if (!user) return;
      const q = query(
        collection(db, "users", user.uid, "visitedCities"),
        orderBy("visitedAt", "asc")
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        _id: doc.id,
      }));
      setVisitedCities(data);
    };

    fetchVisitedCities();
  }, [user]);

  const addCity = async (city) => {
    if (!user) return;
    const timestamp = new Date().toISOString();
    if (
      visitedCities.length &&
      visitedCities[visitedCities.length - 1].name.trim().toLowerCase() ===
        city.name.trim().toLowerCase()
    ) return;

    const newCity = { ...city, visitedAt: timestamp };
    const docRef = await addDoc(
      collection(db, "users", user.uid, "visitedCities"),
      newCity
    );
    setVisitedCities((prev) => [...prev, { ...newCity, _id: docRef.id }]);
  };

  const removeCity = async (idToDelete) => {
    if (!user) return;
    await deleteDoc(doc(db, "users", user.uid, "visitedCities", idToDelete));
    setVisitedCities((prev) => prev.filter((city) => city._id !== idToDelete));
  };

  const editCityName = async (idToEdit, newName) => {
    if (!user) return;
    const cityRef = doc(db, "users", user.uid, "visitedCities", idToEdit);
    await updateDoc(cityRef, { name: newName });
    setVisitedCities((prev) =>
      prev.map((city) =>
        city._id === idToEdit ? { ...city, name: newName } : city
      )
    );
  };

  const clearCities = async () => {
    if (!user) return;
    const q = collection(db, "users", user.uid, "visitedCities");
    const snapshot = await getDocs(q);
    const deletions = snapshot.docs.map((docu) =>
      deleteDoc(doc(db, "users", user.uid, "visitedCities", docu.id))
    );
    await Promise.all(deletions);
    setVisitedCities([]);
  };

  return (
    <VisitedCitiesContext.Provider
      value={{ visitedCities, addCity, removeCity, clearCities, editCityName }}
    >
      {children}
    </VisitedCitiesContext.Provider>
  );
}

export function useVisitedCities() {
  return useContext(VisitedCitiesContext);
}
