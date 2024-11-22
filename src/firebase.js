// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging,getToken } from "firebase/messaging";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdghrQ9HItZ_9aNT1KL6YRWXPIk25Ui2g",
  authDomain: "test-push-e3e3c.firebaseapp.com",
  projectId: "test-push-e3e3c",
  storageBucket: "test-push-e3e3c.firebasestorage.app",
  messagingSenderId: "264272546485",
  appId: "1:264272546485:web:9277f280acb4ad62b18cfc",
  measurementId: "G-BEVJ8SCP2Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);