import { db } from "../config/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

/**
 * Enregistre un nouvel invité avec le statut "pending" (en attente)
 */
export const registerGuestRequest = async (user) => {
  try {
    // On utilise l'UID de l'utilisateur comme identifiant unique dans la collection "guests"
    const guestRef = doc(db, "guests", user.uid);
    
    await setDoc(guestRef, {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      status: "pending", // Statut par défaut
      createdAt: serverTimestamp()
    }, { merge: true }); // "merge: true" évite d'écraser les données si l'utilisateur se reconnecte
    
    console.log("Demande d'accès enregistrée pour:", user.displayName);
  } catch (error) {
    console.error("Erreur lors de l'enregistrement Firestore:", error);
    throw error;
  }
};