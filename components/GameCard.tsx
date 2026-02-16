
import React from 'react';
import { Game } from '../types.ts';

// Added key to GameCardProps to satisfy strict type checking when the component is used in a map within JSX
interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
  key?: React.Key;
}

export default function GameCard({ game, onClick }: GameCardProps) {
  return (
    <div 
      onClick={() => onClick(game)}
      className="group relative bg-slate-800 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-500/20"
    >
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      {game.isPopular && (
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
          Popular
        </div>
      )}

      <div className="p-4 bg-gradient-to-t from-slate-950 to-slate-900/50">
        <h3 className="text-lg font-bold text-slate-100 mb-1 group-hover:text-blue-400 transition-colors">
          {game.title}
        </h3>
        <p className="text-xs text-slate-400 line-clamp-2">
          {game.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[10px] font-semibold text-slate-500 bg-slate-700/50 px-2 py-0.5 rounded">
            {game.category}
          </span>
          <button className="text-sm font-medium text-blue-400 group-hover:translate-x-1 transition-transform">
            Play Now →
          </button>
        </div>
      </div>
    </div>
  );
}
