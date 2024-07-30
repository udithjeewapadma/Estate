// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-bd286.firebaseapp.com",
  projectId: "estate-bd286",
  storageBucket: "estate-bd286.appspot.com",
  messagingSenderId: "460437445637",
  appId: "1:460437445637:web:e12c1a3c5d27ced1a4d06c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);