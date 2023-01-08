
import { getApp, getApps, initializeApp } from "firebase/app";
import 'firebase/firestore';
import {getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCjzGf64sOIjBNHITGqXmlo05CunVYXOF4",
  authDomain: "affilate-website-3f6da.firebaseapp.com",
  projectId: "affilate-website-3f6da",
  storageBucket: "affilate-website-3f6da.appspot.com",
  messagingSenderId: "857436541011",
  appId: "1:857436541011:web:579d5618acf1340b46f6a6",
  measurementId: "G-H6TZCR8VQG"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

const db = getFirestore(app)

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

const storage = getStorage(app);

export {db, auth, provider, storage}
