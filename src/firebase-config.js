// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDByno95fRcd6pzBbc2ooI-nZw8nT0a5v0",
  authDomain: "trello-9063b.firebaseapp.com",
  projectId: "trello-9063b",
  storageBucket: "trello-9063b.appspot.com",
  messagingSenderId: "145350840958",
  appId: "1:145350840958:web:b35fec6074220e9388be2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db =getFirestore(app);
export default db;