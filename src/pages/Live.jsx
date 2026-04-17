import React from 'react';
import { logout } from "../services/auth"; // <--- VÉRIFIE BIEN CETTE LIGNE

function Live({ user }) {
  
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleLogout = async () => {
    if (window.confirm("Voulez-vous vraiment vous déconnecter ?")) {
      await logout(); // <--- Maintenant cette fonction sera reconnue !
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>WeddingLive</h1>
        
        <div style={styles.rightHeader}>
          <button onClick={toggleFullScreen} style={styles.fullScreenBtn}>
            Plein Écran 📺
          </button>

          <button onClick={handleLogout} style={styles.logoutBtn}>
            Déconnexion 🚪
          </button>
          
          <div style={styles.userInfo}>
            <img src={user?.photoURL} alt="Profil" style={styles.avatar} />
            <span style={{ marginLeft: '10px' }}>{user?.displayName}</span>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.videoPlaceholder}>
          <div style={styles.liveBadge}>EN DIRECT</div>
          <p>Le flux vidéo apparaîtra ici...</p>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: { height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#1a1a1a', color: 'white' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#2a2a2a' },
  logo: { color: '#d4a373', fontSize: '1.2rem', margin: 0 },
  rightHeader: { display: 'flex', alignItems: 'center', gap: '15px' },
  fullScreenBtn: { padding: '8px 12px', backgroundColor: '#4a4a4a', border: 'none', borderRadius: '5px', color: 'white', cursor: 'pointer' },
  logoutBtn: { padding: '8px 12px', backgroundColor: '#e63946', border: 'none', borderRadius: '5px', color: 'white', cursor: 'pointer', fontWeight: 'bold' },
  userInfo: { display: 'flex', alignItems: 'center' },
  avatar: { width: '30px', height: '30px', borderRadius: '50%' },
  main: { flex: 1, position: 'relative', overflow: 'hidden' },
  videoPlaceholder: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' },
  liveBadge: { position: 'absolute', top: '20px', left: '20px', backgroundColor: '#e63946', padding: '5px 10px', borderRadius: '3px', fontWeight: 'bold' }
};

export default Live;