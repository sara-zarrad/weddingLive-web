import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth, db } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

// Tes pages
import Home from './pages/Home';
import Waiting from './pages/Waiting';
import Live from './pages/Live';
import ApproveGuest from './pages/ApproveGuest';

function App() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Surveillance de l'authentification
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // 2. Surveillance du statut dans Firestore en temps réel
        const userRef = doc(db, "guests", currentUser.uid);
        const unsubscribeSnapshot = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            setStatus(docSnap.data().status);
          } else {
            setStatus("pending");
          }
          setLoading(false);
        });

        return () => unsubscribeSnapshot();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  if (loading) return <div className="loader">Chargement...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {/* ROUTE POUR LE VIDÉASTE : Lien provenant du mail */}
        <Route path="/approve/:guestId" element={<ApproveGuest />} />

        {/* ROUTE PRINCIPALE : Gère l'affichage selon la connexion et le statut */}
        <Route path="/" element={
          !user ? (
            <Home onLogin={setUser} />
          ) : status === "accepted" ? (
            <Live user={user} />
          ) : (
            <Waiting user={user} />
          )
        } />

        {/* REDIRECTION : Si l'utilisateur tape une adresse inconnue, on le ramène à l'accueil */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;