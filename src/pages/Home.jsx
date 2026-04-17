import { loginWithGoogle } from "../services/auth";
import { registerGuestRequest } from "../services/database";

function Home({ onLogin }) {
  
  const handleConnect = async () => {
    try {
      // Étape A : Authentification avec Google
      const user = await loginWithGoogle();
      
      // Étape B : Enregistrement dans Firestore (pour le vidéaste)
      await registerGuestRequest(user);
      
      // Étape C : Mise à jour de l'état global de l'app
      onLogin(user);
      
    } catch (error) {
      if (error.code !== 'auth/cancelled-popup-request') {
        alert("Erreur lors de la connexion. Vérifie ta connexion internet.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>WeddingLive</h1>
      <p>Bienvenue ! Connectez-vous pour rejoindre le mariage en direct.</p>
      
      <button onClick={handleConnect} style={styles.button}>
        <img 
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
          alt="Google" 
          style={styles.icon} 
        />
        Se connecter avec Google
      </button>
    </div>
  );
}

// Petit style rapide pour que ce soit joli
const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f9f9f9', fontFamily: 'Arial' },
  title: { color: '#d4a373', fontSize: '3rem', marginBottom: '20px' },
  button: { display: 'flex', alignItems: 'center', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  icon: { width: '20px', marginRight: '10px' }
};

export default Home;