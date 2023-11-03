// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAy78Y0_8LsHkN_BkJyiIOH1OTOlhpITk4",
  authDomain: "kotha-barta-bf412.firebaseapp.com",
  projectId: "kotha-barta-bf412",
  storageBucket: "kotha-barta-bf412.appspot.com",
  messagingSenderId: "1064337961045",
  appId: "1:1064337961045:web:ab0fe8497b256e7596a4dc",
  measurementId: "G-1VK2ENF8HC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig;