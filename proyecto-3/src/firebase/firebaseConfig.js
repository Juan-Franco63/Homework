import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDnA_6zTJNG4wC8AMJLqxY64vpOvSf9jak",
  authDomain: "miniproyecto-03-bbc69.firebaseapp.com",
  projectId: "miniproyecto-03-bbc69",
  storageBucket: "miniproyecto-03-bbc69.firebasestorage.app",
  messagingSenderId: "49949934222",
  appId: "1:49949934222:web:b9cd6b75e6daae7988bfdf"
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(app);

export { db };
