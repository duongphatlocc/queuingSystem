import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA2jkHEBTIzA9y_FrMg4g0SSjEdabgAufc",
  authDomain: "queuing-system-12980.firebaseapp.com",
  projectId: "queuing-system-12980",
  storageBucket: "queuing-system-12980.appspot.com",
  messagingSenderId: "15571153450",
  appId: "1:15571153450:web:dec9a843e9154d00c24953",
  measurementId: "G-JE8YCX2L3S",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
