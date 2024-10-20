// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCc-kTSQ8KhjjbMsFtNnlQi24qdbgjOTTc",
    authDomain: "usersphere-d6472.firebaseapp.com",
    databaseURL: "https://usersphere-d6472-default-rtdb.firebaseio.com",
    projectId: "usersphere-d6472",
    storageBucket: "usersphere-d6472.appspot.com",
    messagingSenderId: "979340864681",
    appId: "1:979340864681:web:24bf5c82cd26bb1d24cdb8",
    measurementId: "G-MJMR06KDSQ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
export const auth = getAuth(app);