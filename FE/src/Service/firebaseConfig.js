import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRjcxoBo2ezaS89SwsrFAuEJ-4pd0sU6k",
  authDomain: "chatrealtime-cb6a0.firebaseapp.com",
  projectId: "chatrealtime-cb6a0",
  storageBucket: "chatrealtime-cb6a0.appspot.com",
  messagingSenderId: "156500470716",
  appId: "1:156500470716:web:1a180086bd4e4e056a19b9",
  measurementId: "G-DY06R8Q9NC",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export { db };
