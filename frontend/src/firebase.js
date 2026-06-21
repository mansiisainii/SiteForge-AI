// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "siteforge-ai-ms.firebaseapp.com",
  projectId: "siteforge-ai-ms",
  storageBucket: "siteforge-ai-ms.firebasestorage.app",
  messagingSenderId: "540439104356",
  appId: "1:540439104356:web:3d94ddcdd2317b93a38871"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app)
const provider= new GoogleAuthProvider()

export {auth,provider}