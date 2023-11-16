// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3aq40DWBTZf3gSu3IygBzlRiPQzVqPwk",
  authDomain: "cooking-ninja-site-67985.firebaseapp.com",
  projectId: "cooking-ninja-site-67985",
  storageBucket: "cooking-ninja-site-67985.appspot.com",
  messagingSenderId: "567470338049",
  appId: "1:567470338049:web:fb9613faeb5f5aaf3f1000"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)