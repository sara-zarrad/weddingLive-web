import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Ajout pour Gmail
import { getFirestore } from "firebase/firestore";        // Ajout pour la base de données

const firebaseConfig = {
  apiKey: "AIzaSyChbNQryVWq8Tz2zR7TvGkGwNJC9vN83ys",
  authDomain: "weddinglive-6a016.firebaseapp.com",
  projectId: "weddinglive-6a016",
  storageBucket: "weddinglive-6a016.firebasestorage.app",
  messagingSenderId: "860406432182",
  appId: "1:860406432182:web:c25bd561de4af1f7d80117",
  measurementId: "G-KM3YEKFR21"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// On exporte les outils pour les utiliser dans tes pages
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Optionnel : Configurer le comportement de la fenêtre Google (force le choix du compte)
googleProvider.setCustomParameters({ prompt: 'select_account' });