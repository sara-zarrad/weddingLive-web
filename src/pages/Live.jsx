import React from 'react';
import { logout } from "../services/auth";

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
      await logout();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans overflow-hidden">
      
      {/* HEADER : Design sombre et élégant */}
      <header className="flex items-center justify-between px-6 py-4 bg-zinc-900 border-b border-zinc-800 shadow-lg z-20">
        <div className="flex flex-col">
          <h1 className="text-xl font-serif tracking-widest text-weddingGold uppercase leading-none">
            WeddingLive
          </h1>
          <span className="text-[10px] text-zinc-500 tracking-[0.2em] mt-1 uppercase">Cérémonie en direct</span>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Boutons d'action */}
          <div className="flex items-center bg-zinc-800 rounded-full p-1 border border-zinc-700">
            <button 
              onClick={toggleFullScreen} 
              className="px-4 py-1.5 text-xs font-medium hover:bg-zinc-700 rounded-full transition-all"
            >
              Plein Écran 📺
            </button>
            <button 
              onClick={handleLogout} 
              className="px-4 py-1.5 text-xs font-bold text-red-400 hover:text-red-300 transition-colors"
            >
              Quitter 🚪
            </button>
          </div>
          
          {/* Profil Utilisateur */}
          <div className="flex items-center gap-3 pl-4 border-l border-zinc-800">
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-sm font-medium leading-none">{user?.displayName}</span>
              <span className="text-[10px] text-green-500">En ligne</span>
            </div>
            <img 
              src={user?.photoURL} 
              alt="Profil" 
              className="w-10 h-10 rounded-full border-2 border-weddingGold/30 shadow-md" 
            />
          </div>
        </div>
      </header>

      {/* MAIN : Zone de diffusion immersive */}
      <main className="flex-1 relative bg-gradient-to-b from-zinc-900 to-black flex items-center justify-center p-0 md:p-8">
        
        {/* Conteneur Vidéo */}
        <div className="relative w-full h-full max-w-6xl aspect-video bg-black shadow-[0_0_50px_rgba(0,0,0,0.5)] md:rounded-2xl overflow-hidden border border-zinc-800">
          
          {/* Badge Live Clignotant */}
          <div className="absolute top-6 left-6 z-10 flex items-center gap-2 px-3 py-1.5 bg-red-600 rounded-md text-[10px] font-black tracking-widest shadow-lg animate-pulse">
            <span className="w-2 h-2 bg-white rounded-full"></span> EN DIRECT
          </div>

          {/* Placeholder du flux vidéo */}
          <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
            {/* Icône de caméra stylisée */}
            <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-700 border border-zinc-800">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
               </svg>
            </div>
            <div className="text-center">
              <p className="text-zinc-500 font-medium italic">Connexion sécurisée établie...</p>
              <p className="text-zinc-600 text-xs mt-1">Le flux vidéo apparaîtra ici dans quelques instants</p>
            </div>
          </div>

          {/* Overlay discret en bas */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          </div>
        </div>

      </main>

      {/* Footer minimaliste */}
      <footer className="py-3 px-6 bg-zinc-950 text-center border-t border-zinc-900">
        <p className="text-[10px] text-zinc-600 tracking-[0.3em] uppercase">
          Wedding live &copy; 2026
        </p>
      </footer>
    </div>
  );
}

export default Live;