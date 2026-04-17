import React from 'react';
import { loginWithGoogle } from "../services/auth";
import { registerGuestRequest } from "../services/database";
import { sendAdminNotification } from "../services/notifications";

function Home({ onLogin }) {
  const handleConnect = async () => {
    try {
      const user = await loginWithGoogle();
      await registerGuestRequest(user);
      await sendAdminNotification(user);
      onLogin(user);
    } catch (error) {
      console.error("Erreur de connexion:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfcf0] flex flex-col items-center justify-center p-6">
      {/* Carte principale */}
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl shadow-weddingGold/20 overflow-hidden border border-weddingGold/10">
        
        {/* Header avec image ou motif */}
        <div className="h-48 bg-weddingGold flex items-center justify-center relative">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
          <div className="text-white text-center z-10">
            <span className="text-5xl">💍</span>
            <h1 className="mt-4 text-2xl font-serif tracking-widest uppercase">WeddingLive</h1>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-10 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Bienvenue à la célébration</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Rejoignez-nous en direct pour partager ce moment inoubliable. 
            Connectez-vous pour demander votre accès au flux vidéo.
          </p>

          {/* Bouton Google Stylé */}
          <button 
            onClick={handleConnect}
            className="flex items-center justify-center gap-3 w-full bg-white border-2 border-gray-200 py-3 px-6 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 hover:border-weddingGold transition-all duration-300 group"
          >
            <img 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/pwa_google_main_64dp.png" 
              alt="Google" 
              className="w-6 h-6"
            />
            <span className="group-hover:text-weddingGold">Se connecter avec Google</span>
          </button>
        </div>
      </div>

      {/* Footer décoratif */}
      <div className="mt-10 text-weddingGold/60 font-serif italic text-lg">
        " L'amour est la seule aventure qui ne finit jamais "
      </div>
    </div>
  );
}

export default Home;