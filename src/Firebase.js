// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHHlfl4nvO9FOpYlUMD1wL1Uwee212Wjs",
  authDomain: "proyectogrado-a034f.firebaseapp.com",
  projectId: "proyectogrado-a034f",
  storageBucket: "proyectogrado-a034f.appspot.com",
  messagingSenderId: "434707992927",
  appId: "1:434707992927:web:344f640c3e7f40bebaa6ea",
  measurementId: "G-X6W9X3EMFQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);