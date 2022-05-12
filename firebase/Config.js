// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuCiWQD1lqDkBSG9HA7tCpStFJ5zicKYA",
  authDomain: "appetito-2346e.firebaseapp.com",
  projectId: "appetito-2346e",
  storageBucket: "appetito-2346e.appspot.com",
  messagingSenderId: "464580390940",
  appId: "1:464580390940:web:6d8ad87403b72e6e1cafd9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)