
import React, { useState, useEffect, useMemo } from 'react';
import { CATEGORIES } from './types.ts';
import type { Game } from './types.ts';
import GameCard from './components/GameCard.tsx';
import GamePlayer from './components/GamePlayer.tsx';

const App = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('./games.json')
      .then(res => res.json())
      .then(data => {
        setGames(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load games:", err);
        setLoading(false);
      });
  }, []);

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [games, activeCategory, searchQuery]);

  if (selectedGame) {
    return (
      <GamePlayer 
        game={selectedGame} 
        onClose={() => setSelectedGame(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col pb-20">
      <nav className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveCategory('All')}>
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-xl font-extrabold tracking-tighter text-white">
            NOVA<span className="text-blue-500">ARCADE</span>
          </h1>
        </div>

        <div className="relative w-full md:w-96 group">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input 
            type="text" 
            placeholder="Search for a game..." 
            className="block w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-slate-200 placeholder-slate-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </nav>

      <main className="flex-grow px-6 py-8 max-w-7xl mx-auto w-full">
        {!searchQuery && activeCategory === 'All' && (
          <section className="mb-12">
            <div className="relative rounded-3xl overflow-hidden aspect-[21/9] bg-slate-800">
              <img 
                src="https://picsum.photos/seed/arcade/1200/500" 
                alt="Featured Game"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-8 md:p-12">
                <span className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 w-fit uppercase tracking-widest">
                  Staff Pick
                </span>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-none">
                  LEVEL UP YOUR <br/>BREAK TIME
                </h2>
                <p className="text-slate-300 max-w-xl text-lg mb-8 hidden md:block">
                  Discover hundreds of hand-picked unblocked games. No downloads, no blocked sites, just pure fun.
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setSelectedGame(games[0])}
                    className="bg-white text-slate-950 px-8 py-3 rounded-xl font-bold hover:bg-blue-500 hover:text-white transition-all transform hover:-translate-y-1"
                  >
                    Play Now
                  </button>
                  <button 
                    className="bg-slate-800/80 backdrop-blur text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-700 transition-all"
                    onClick={() => {
                      const el = document.getElementById('game-grid');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Browse Library
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
            {searchQuery ? `Search Results for "${searchQuery}"` : `${activeCategory} Games`}
          </h3>
          <span className="text-slate-500 text-sm font-medium">
            {filteredGames.length} Games Found
          </span>
        </div>

        <div id="game-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
             Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-slate-800 animate-pulse aspect-[4/5] rounded-xl"></div>
             ))
          ) : filteredGames.length > 0 ? (
            filteredGames.map(game => (
              <GameCard 
                key={game.id} 
                game={game} 
                onClick={setSelectedGame} 
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-slate-300">No games found</h4>
              <p className="text-slate-500 mt-2">Try adjusting your search or category filters.</p>
              <button 
                onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
                className="mt-6 text-blue-500 font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
             <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-lg font-extrabold tracking-tighter text-white">
                NOVA<span className="text-blue-500">ARCADE</span>
              </h2>
            </div>
            <p className="text-slate-500 max-w-sm mb-6">
              The premium destination for unblocked web games. Curated by gamers, for gamers. Accessible everywhere, including schools and workplaces.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Explore</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Popular Games</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">New Additions</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Staff Picks</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Categories</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Report a Bug</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>© 2024 NovaArcade. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg> for the gaming community.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
