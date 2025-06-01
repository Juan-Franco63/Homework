// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkmeaT8VKYtvLqw10dtSu4sB2LZoJ-fAQ",
  authDomain: "miniproyecto-03.firebaseapp.com",
  projectId: "miniproyecto-03",
  storageBucket: "miniproyecto-03.firebasestorage.app",
  messagingSenderId: "333254324169",
  appId: "1:333254324169:web:528ac39f426496eff24218"
};
// Inicializar la app
const app = initializeApp(firebaseConfig);

// Exportar Firestore y Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };