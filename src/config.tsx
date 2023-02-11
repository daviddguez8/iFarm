// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBX5Bh0qJbT2Ecd6g__26ZGKOrEPRXJR8M",
  authDomain: "dominguez-sandbox-4ae46.firebaseapp.com",
  projectId: "dominguez-sandbox-4ae46",
  storageBucket: "dominguez-sandbox-4ae46.appspot.com",
  messagingSenderId: "608602579732",
  appId: "1:608602579732:web:902ff8509594e8f38dd801",
  measurementId: "G-BVV2C7XBNS"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export default firebaseApp;