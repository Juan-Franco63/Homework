// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvJOXr1w4rIvVKWhVWaPVHkj6bCYVA_hQ",
  authDomain: "biblioteca-virtual-9d32f.firebaseapp.com",
  projectId: "biblioteca-virtual-9d32f",
  storageBucket: "biblioteca-virtual-9d32f.firebasestorage.app",
  messagingSenderId: "354158041597",
  appId: "1:354158041597:web:3f1f66e312de53dc4c6194"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportamos servicios que usaremos
export const auth = getAuth(app);
export const db = getFirestore(app);