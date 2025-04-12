
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 


const firebaseConfig = {
  apiKey: "AIzaSyAuVAmsIFxB1zvMdcTpVxghpds373KQ9AM",
  authDomain: "fir-proyect-38ecd.firebaseapp.com",
  projectId: "fir-proyect-38ecd",
  storageBucket: "fir-proyect-38ecd.firebasestorage.app",
  messagingSenderId: "215299952868",
  appId: "1:215299952868:web:4f6492af98e3b0e0475cf1",
  measurementId: "G-23LT2V2V68"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app); 


export { auth, db };
