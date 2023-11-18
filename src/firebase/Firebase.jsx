import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCclkFqP7r2Ors4jfjZHSU00I103Y1mJPA",
    authDomain: "your-room-9e781.firebaseapp.com",
    projectId: "your-room-9e781",
    storageBucket: "your-room-9e781.appspot.com",
    messagingSenderId: "176291315387",
    appId: "1:176291315387:web:1b1545503910abca9b339e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();
export const db = getFirestore(app);
export const auth = getAuth(app);
