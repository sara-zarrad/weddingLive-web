import React from 'react';
import { logout } from "../services/auth"; // Import de la fonction pour se déconnecter

function Waiting({ user }) {
  
  const handleLogout = async () => {
    // Une petite confirmation pour éviter les erreurs
    if (window.confirm("Souhaitez-vous annuler votre demande et revenir à l'accueil ?")) {
      await logout();
      // App.jsx détectera automatiquement que user est null et affichera Home
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.loader}></div>
        
        <h2 style={styles.title}>Demande envoyée !</h2>
        
        <p style={styles.text}>
          Patience <strong>{user?.displayName}</strong>, votre demande d'accès est en cours de validation par le vidéaste.
        </p>

        {/* BOUTON RETOUR / DÉCONNEXION */}
        <button onClick={handleLogout} style={styles.backBtn}>
          Annuler et revenir à l'accueil
        </button>

        <p style={styles.subText}>
          Cette page s'actualisera automatiquement dès que vous serez accepté.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
    backgroundColor: '#fdfcf0', 
    padding: '20px' 
  },
  card: { 
    textAlign: 'center', 
    padding: '40px', 
    backgroundColor: 'white', 
    borderRadius: '15px', 
    boxShadow: '0 10px 25px rgba(0,0,0,0.05)', 
    maxWidth: '400px' 
  },
  loader: { 
    border: '4px solid #f3f3f3', 
    borderTop: '4px solid #d4a373', 
    borderRadius: '50%', 
    width: '40px', 
    height: '40px', 
    animation: 'spin 2s linear infinite', 
    margin: '0 auto 20px' 
  },
  title: { color: '#6b705c', marginBottom: '15px' },
  text: { color: '#a5a58d', lineHeight: '1.6', marginBottom: '30px' },
  
  // Style du bouton de retour
  backBtn: {
    backgroundColor: 'transparent',
    color: '#cb997e',
    border: '1px solid #cb997e',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  },
  
  subText: { 
    color: '#cb997e', 
    fontSize: '0.8rem', 
    marginTop: '25px', 
    fontStyle: 'italic',
    opacity: 0.7 
  }
};

export default Waiting;