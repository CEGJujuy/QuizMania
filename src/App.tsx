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
      className="min-h-screen p-4 sm:p-6 lg:p-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-12 gap-4">
          <button
            onClick={() => handleNavigate('menu')}
            className="btn-ghost flex items-center gap-2 self-start sm:self-center"
          >
            <ArrowLeft size={20} />
            Volver al Menú
          </button>
          
          <div className="text-center flex-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-2">
              Elige tu Categoría
            </h1>
            <p className="text-white/80 text-lg font-light">Selecciona un tema para comenzar</p>
          </div>
          
          <div className="hidden sm:block w-32"></div>
        </div>

        {/* Player Points */}
        {player && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="game-card mb-8 text-center"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <span className="text-2xl">{player.avatar}</span>
              <div>
                <p className="font-bold text-lg">{player.name}</p>
                <p className="text-yellow-400 font-bold">{player.totalPoints} puntos totales</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-3xl backdrop-blur-sm">
                    <div className="text-center">
                      <Lock className="text-white/70 mx-auto mb-2" size={32} />
                      <p className="text-white/80 text-sm font-medium">
                        Requiere {category.requiredPoints} puntos
                      </p>
                    </div>
                  </div>
                )}

                {/* Category Content */}
                <div className="text-center p-2">
                  <div className="text-5xl sm:text-6xl mb-4">{category.icon}</div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3">{category.name}</h3>
                  <p className="text-white/80 text-sm sm:text-base mb-6 leading-relaxed">{category.description}</p>
                  
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${category.color} text-white text-sm font-semibold shadow-lg`}>
                    <Star size={14} />
                    <span>{category.requiredPoints} pts</span>
                  </div>
                </div>

                {/* Unlock Animation */}
                {isUnlocked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <span className="text-white text-sm font-bold">✓</span>
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
          className="mt-12 glass-card p-6 sm:p-8 text-center"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gradient">🎯 Tu Progreso</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="stat-card">
              <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-1">{unlockedCategories.length}</div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">Categorías Desbloqueadas</div>
            </div>
            <div className="stat-card">
              <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1">{categories.length - unlockedCategories.length}</div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">Por Desbloquear</div>
            </div>
            <div className="stat-card">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1">{player?.totalPoints || 0}</div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">Puntos Totales</div>
            </div>
            <div className="stat-card">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1">
                {categories.find(c => !unlockedCategories.includes(c.id))?.requiredPoints || 'MAX'}
              </div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">Próximo Objetivo</div>
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