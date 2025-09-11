import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Star, ArrowLeft } from 'lucide-react';

import { MainMenu } from './components/MainMenu';
import { GameScreen } from './components/GameScreen';
import { Leaderboard } from './components/Leaderboard';
import { PlayerProfile } from './components/PlayerProfile';
import { GameComplete } from './components/GameComplete';

import { useLocalStorage } from './hooks/useLocalStorage';
import { Player, LeaderboardEntry, GameSession, GameScreen as GameScreenType } from './types';
import { categories } from './data/questions';

function App() {
  const [currentScreen, setCurrentScreen] = useState<GameScreenType>('menu');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [gameSession, setGameSession] = useState<GameSession | null>(null);

  const [player, setPlayer] = useLocalStorage<Player | null>('quizmania_player', null);
  const [leaderboard, setLeaderboard] = useLocalStorage<LeaderboardEntry[]>('quizmania_leaderboard', []);
  const [unlockedCategories, setUnlockedCategories] = useLocalStorage<string[]>('quizmania_unlocked', ['science']);

  // Update unlocked categories based on player points
  useEffect(() => {
    if (player) {
      const newUnlocked = categories
        .filter(cat => player.totalPoints >= cat.requiredPoints)
        .map(cat => cat.id);
      
      if (newUnlocked.length > unlockedCategories.length) {
        setUnlockedCategories(newUnlocked);
      }
    }
  }, [player, unlockedCategories, setUnlockedCategories]);

  const handleNavigate = (screen: GameScreenType) => {
    setCurrentScreen(screen);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentScreen('game');
  };

  const handleGameComplete = (session: GameSession) => {
    setGameSession(session);
    setCurrentScreen('complete');
  };

  const handlePlayAgain = () => {
    setCurrentScreen('game');
  };

  const updateLeaderboard = (entry: LeaderboardEntry) => {
    setLeaderboard(prev => [...prev, entry]);
  };

  const updatePlayer = (updatedPlayer: Player) => {
    setPlayer(updatedPlayer);
  };

  const renderCategoriesScreen = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen p-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => handleNavigate('menu')}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Volver al Menú
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
              Elige tu Categoría
            </h1>
            <p className="text-white/70">Selecciona un tema para comenzar</p>
          </div>
          
          <div></div>
        </div>

        {/* Player Points */}
        {player && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="game-card mb-8 text-center"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">{player.avatar}</span>
              <div>
                <p className="font-bold text-lg">{player.name}</p>
                <p className="text-yellow-400 font-bold">{player.totalPoints} puntos totales</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const isUnlocked = unlockedCategories.includes(category.id);
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`category-card relative ${!isUnlocked ? 'opacity-60' : ''}`}
                onClick={() => isUnlocked && handleCategorySelect(category.id)}
              >
                {/* Lock Overlay */}
                {!isUnlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
                    <div className="text-center">
                      <Lock className="text-white/70 mx-auto mb-2" size={32} />
                      <p className="text-white/70 text-sm">
                        Requiere {category.requiredPoints} puntos
                      </p>
                    </div>
                  </div>
                )}

                {/* Category Content */}
                <div className="text-center">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-white/70 text-sm mb-4">{category.description}</p>
                  
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${category.color} text-white text-sm font-bold`}>
                    <Star size={14} />
                    <span>{category.requiredPoints} pts</span>
                  </div>
                </div>

                {/* Unlock Animation */}
                {isUnlocked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <span className="text-white text-xs">✓</span>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Progress Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 game-card text-center"
        >
          <h3 className="text-lg font-bold mb-4">🎯 Tu Progreso</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold text-green-400">{unlockedCategories.length}</div>
              <div className="text-xs text-white/70">Categorías Desbloqueadas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">{categories.length - unlockedCategories.length}</div>
              <div className="text-xs text-white/70">Por Desbloquear</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">{player?.totalPoints || 0}</div>
              <div className="text-xs text-white/70">Puntos Totales</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">
                {categories.find(c => !unlockedCategories.includes(c.id))?.requiredPoints || 'MAX'}
              </div>
              <div className="text-xs text-white/70">Próximo Objetivo</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {currentScreen === 'menu' && (
          <MainMenu
            key="menu"
            onNavigate={handleNavigate}
            playerName={player?.name || ''}
          />
        )}

        {currentScreen === 'categories' && (
          <div key="categories">
            {renderCategoriesScreen()}
          </div>
        )}

        {currentScreen === 'game' && selectedCategory && (
          <GameScreen
            key="game"
            categoryId={selectedCategory}
            player={player}
            onNavigate={handleNavigate}
            onGameComplete={handleGameComplete}
            updateLeaderboard={updateLeaderboard}
            updatePlayer={updatePlayer}
          />
        )}

        {currentScreen === 'leaderboard' && (
          <Leaderboard
            key="leaderboard"
            leaderboard={leaderboard}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'profile' && (
          <PlayerProfile
            key="profile"
            player={player}
            onNavigate={handleNavigate}
            onSavePlayer={setPlayer}
          />
        )}

        {currentScreen === 'complete' && gameSession && (
          <GameComplete
            key="complete"
            session={gameSession}
            onNavigate={handleNavigate}
            onPlayAgain={handlePlayAgain}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;