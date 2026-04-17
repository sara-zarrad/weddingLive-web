import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

export const loginWithGoogle = async () => {
  try {
    // 1. Ouvre la popup Google
    const result = await signInWithPopup(auth, googleProvider);
    
    // 2. Récupère l'utilisateur
    const user = result.user;
    console.log("Connecté en tant que :", user.displayName);
    
    return user;
  } catch (error) {
    console.error("Erreur de connexion Google :", error.message);
    throw error;
  }
  
};
export const logout = async () => {
  try {
    await signOut(auth); // Maintenant, il saura ce que c'est !
    console.log("Utilisateur déconnecté");
  } catch (error) {
    console.error("Erreur déconnexion:", error);
  }
};