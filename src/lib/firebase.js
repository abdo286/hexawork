import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-kJfo2JjZKDApYSEF-7vQWtYW3p3x2xM",
  authDomain: "netflix-clone-f30c9.firebaseapp.com",
  databaseURL: "https://netflix-clone-f30c9-default-rtdb.firebaseio.com",
  projectId: "netflix-clone-f30c9",
  storageBucket: "netflix-clone-f30c9.appspot.com",
  messagingSenderId: "63579123276",
  appId: "1:63579123276:web:26d8a9f7a8dac6c5e68ee9",
};

// init firebase app
initializeApp(firebaseConfig);

// init services
export const db = getFirestore();
export const auth = getAuth();
