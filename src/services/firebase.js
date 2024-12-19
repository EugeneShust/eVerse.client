// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUaiq0GEOhkv0hbN8lx-kv5LSfZV0vvoM",
  authDomain: "everse-web-app.firebaseapp.com",
  projectId: "everse-web-app",
  //storageBucket: "everse-web-app.firebasestorage.app",
  messagingSenderId: "906923231088",
  appId: "1:906923231088:web:56d9ccee4a7bd38f96f1b5",
  measurementId: "G-J7RQS247X8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);