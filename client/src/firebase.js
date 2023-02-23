// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcZ75iaXqwzFtOQ4rEkJRZHZeeRqOQuQY",
  authDomain: "ecommerce-b78e8.firebaseapp.com",
  projectId: "ecommerce-b78e8",
  storageBucket: "ecommerce-b78e8.appspot.com",
  messagingSenderId: "650748101788",
  appId: "1:650748101788:web:929fe496b3204f6ca99959"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// auth function
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();