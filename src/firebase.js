// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeNy14qK22iV2cke6yvrcpuvSuw-LDjZw",
  authDomain: "paas-application-62bc2.firebaseapp.com",
  projectId: "paas-application-62bc2",
  storageBucket: "paas-application-62bc2.firebasestorage.app",
  messagingSenderId: "584020638026",
  appId: "1:584020638026:web:eea17207dd8f13515b29b3",
  measurementId: "G-8MRPXXQ9ZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };