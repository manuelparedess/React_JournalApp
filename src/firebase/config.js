// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa5plma05-G70OR_2buyVdj91yZLDcHFs",
  authDomain: "react-journalapp-2e9af.firebaseapp.com",
  projectId: "react-journalapp-2e9af",
  storageBucket: "react-journalapp-2e9af.appspot.com",
  messagingSenderId: "1038910603752",
  appId: "1:1038910603752:web:8f842fb47dcea7b13d245d"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth( firebaseApp );
export const firebaseDB = getFirestore( firebaseApp );