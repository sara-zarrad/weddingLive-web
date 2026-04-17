import React from 'react';
import { logout } from "../services/auth";

function Waiting({ user }) {
  
  const handleLogout = async () => {
    if (window.confirm("Souhaitez-vous annuler votre demande et revenir à l'accueil ?")) {
      await logout();
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfcf0] flex items-center justify-center p-6 font-sans">
      
      {/* Carte principale avec animation d'apparition douce */}
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-xl shadow-weddingGold/5 border border-weddingGold/10 text-center relative overflow-hidden transition-all">
        
        {/* Décoration subtile en arrière-plan */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-weddingGold/40 to-transparent"></div>

        {/* Loader stylé et animé */}
        <div className="relative mb-8 flex justify-center">
          <div className="w-20 h-20 border-4 border-weddingGold/10 border-t-weddingGold rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-2xl">
            ⏳
          </div>
        </div>
        
        <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4 tracking-tight">
          Demande envoyée !
        </h2>
        
        <p className="text-gray-500 leading-relaxed mb-10">
          Patience <span className="font-semibold text-gray-700">{user?.displayName}</span>, 
          votre demande d'accès est en cours de validation par le vidéaste pour rejoindre la célébration.
        </p>

        {/* Bouton d'annulation stylé */}
        <div className="space-y-6">
          <button 
            onClick={handleLogout} 
            className="w-full py-4 px-6 text-weddingGold font-bold text-sm uppercase tracking-widest border-2 border-weddingGold/20 rounded-2xl hover:bg-weddingGold hover:text-white hover:border-weddingGold transition-all duration-500 group"
          >
            <span className="flex items-center justify-center gap-2">
              Annuler la demande
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </button>

          <div className="flex flex-col items-center gap-2">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-weddingGold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-weddingGold"></span>
            </span>
            <p className="text-[11px] text-weddingGold/60 italic font-medium tracking-wide uppercase">
              Actualisation en temps réel
            </p>
          </div>
        </div>
      </div>

      {/* Message décoratif en bas de page */}
      <div className="absolute bottom-10 text-gray-400 text-xs tracking-widest uppercase">
        CinéEvents &bull; Wedding Experience
      </div>
    </div>
  );
}

export default Waiting;