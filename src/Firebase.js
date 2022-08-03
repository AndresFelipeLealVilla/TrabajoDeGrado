import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, deleteDoc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Configuración de Firebase para la aplicación web
// Para Firebase JS SDK v7.20.0 y posteriores, el Id de medición es opcional
const firebaseConfig = {
  apiKey: "AIzaSyCHHlfl4nvO9FOpYlUMD1wL1Uwee212Wjs",
  authDomain: "proyectogrado-a034f.firebaseapp.com",
  projectId: "proyectogrado-a034f",
  storageBucket: "proyectogrado-a034f.appspot.com",
  messagingSenderId: "434707992927",
  appId: "1:434707992927:web:344f640c3e7f40bebaa6ea",
  measurementId: "G-X6W9X3EMFQ"
};

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);

// Obtener una instancia de Analytics
export const analytics = getAnalytics(app);

// Obtener una instancia de Auth, conexión a la autenticación
export const auth = getAuth(app);

// Obtener una instancia de Firestore, conexión a la base de datos
export const firestore = getFirestore(app);