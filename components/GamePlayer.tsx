import React, { useState } from 'react';
import { Game } from '../types.ts';

interface GamePlayerProps {
  game: Game;
  onClose: () => void;
}

export default function GamePlayer({ game, onClose }: GamePlayerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const elem = document.getElementById('game-frame-container');
    if (!elem) return;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 animate-in fade-in duration-300">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h2 className="text-lg font-bold text-white">{game.title}</h2>
            <p className="text-xs text-slate-500">{game.category} • Unblocked</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleFullscreen}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors text-slate-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            Fullscreen
          </button>
          <button 
            onClick={onClose}
            className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div id="game-frame-container" className="flex-grow bg-black relative">
        <iframe
          src={game.iframeUrl}
          className="w-full h-full border-none"
          title={game.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-scripts allow-same-origin"
        />
      </div>

      <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 text-slate-400 text-sm flex justify-between items-center">
        <div className="flex gap-6">
          <span className="flex items-center gap-2">
            <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] font-mono border border-slate-700">F</span> 
            Toggle Fullscreen
          </span>
          <span className="flex items-center gap-2">
            <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] font-mono border border-slate-700">ESC</span> 
            Exit
          </span>
        </div>
        <p>Tip: If game doesn't load, try disabling your adblocker.</p>
      </div>
    </div>
  );
}
