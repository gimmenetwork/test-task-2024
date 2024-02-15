// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC962OgfaYEVdfL2MeqadmBhn__mVOGjJg",
  authDomain: "mern-book-inventory-72eb6.firebaseapp.com",
  projectId: "mern-book-inventory-72eb6",
  storageBucket: "mern-book-inventory-72eb6.appspot.com",
  messagingSenderId: "549034034601",
  appId: "1:549034034601:web:3a018a6db6b349987cb0b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;