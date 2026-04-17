import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

function ApproveGuest() {
  const { guestId } = useParams(); // Récupère l'ID dans l'URL
  const [message, setMessage] = useState("Validation en cours...");
  const navigate = useNavigate();

  useEffect(() => {
    const validateGuest = async () => {
      try {
        const guestRef = doc(db, "guests", guestId);
        await updateDoc(guestRef, { status: "accepted" });
        setMessage("✅ Invité accepté avec succès !");
        
        // Optionnel : redirection vers l'accueil après 3 secondes
        setTimeout(() => navigate('/'), 3000);
      } catch (error) {
        console.error(error);
        setMessage("❌ Erreur lors de la validation.");
      }
    };

    if (guestId) validateGuest();
  }, [guestId, navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center' }}>
      <div style={{ padding: '30px', background: 'white', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <h2>Interface de Validation</h2>
        <p style={{ fontSize: '1.2rem', color: '#d4a373' }}>{message}</p>
      </div>
    </div>
  );
}

export default ApproveGuest;