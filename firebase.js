// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoDO25TkjIVfYysKekqMChHLqX7tpD-Io",
  authDomain: "enabledlearning-15af8.firebaseapp.com",
  databaseURL: "https://enabledlearning-15af8-default-rtdb.firebaseio.com",
  projectId: "enabledlearning-15af8",
  storageBucket: "enabledlearning-15af8.appspot.com",
  messagingSenderId: "888578593036",
  appId: "1:888578593036:web:f9b52eee3d78a281edb929",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
