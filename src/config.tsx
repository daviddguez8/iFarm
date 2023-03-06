// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNX1Z3YeBAP3uAUaPV2QztO6BjtvPrbls",
  authDomain: "ifarm-b8032.firebaseapp.com",
  projectId: "ifarm-b8032",
  storageBucket: "ifarm-b8032.appspot.com",
  messagingSenderId: "832870473490",
  appId: "1:832870473490:web:b15309f9c6850859bd9dcb",
  measurementId: "G-4BHGRS1R9W"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);


export default firebaseApp;