// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBabcK7ziupw3l_D69h-3_ISEa0aaXqjMI",
    authDomain: "my-blog-app-mobile.firebaseapp.com",
    projectId: "my-blog-app-mobile",
    storageBucket: "my-blog-app-mobile.appspot.com",
    messagingSenderId: "762349078139",
    appId: "1:762349078139:web:43fa0907dc83696c8f84de"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_db = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

// Set persistence
setPersistence(FIREBASE_AUTH, getReactNativePersistence(AsyncStorage))
    .then(() => {
        console.log("Persistance set sucessfully")
    })
    .catch((error) => {
        // Handle errors here
        console.error("Error setting persistence:", error);
    });
