import { useState, useEffect } from 'react';
import { auth, db } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import Home from './pages/Home';
import Waiting from './pages/Waiting';
import Live from './pages/Live';

function App() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. On écoute si l'utilisateur est connecté à Firebase
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // 2. S'il est connecté, on écoute son statut en TEMPS RÉEL dans Firestore
        const userRef = doc(db, "guests", currentUser.uid);
        const unsubscribeSnapshot = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            setStatus(docSnap.data().status);
          } else {
            setStatus("pending"); // Par défaut s'il n'est pas encore dans la DB
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

  // LOGIQUE D'AFFICHAGE DES PAGES
  if (!user) {
    return <Home onLogin={setUser} />;
  }

  if (status === "accepted") {
    return <Live user={user} />;
  }

  // Si le statut est "pending" ou autre, on affiche la page d'attente
  return <Waiting user={user} />;
}

export default App;