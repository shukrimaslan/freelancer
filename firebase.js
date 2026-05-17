import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDM0L-T9oGIEdfOsuTMiwnL-nzJF1HSB90",
  authDomain: "freelancer-my.firebaseapp.com",
  projectId: "freelancer-my",
  storageBucket: "freelancer-my.firebasestorage.app",
  messagingSenderId: "784523150196",
  appId: "1:784523150196:web:5370e72117d4ac315e2221",
  measurementId: "G-FF98TXB759"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);
export const storage = getStorage(app);
