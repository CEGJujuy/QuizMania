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
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Background Shapes */}
      <div className="floating-shapes">
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen p-4 sm:p-6 lg:p-8"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-12 gap-4">
            <motion.button
              onClick={() => handleNavigate('menu')}
              className="btn-ghost flex items-center gap-2 self-start sm:self-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} />
              Volver al Menú
            </motion.button>
            
            <div className="text-center flex-1">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-gradient mb-4"
              >
                🎯 Elige tu Desafío
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white/90 text-xl font-medium"
              >
                Selecciona una categoría y demuestra tu conocimiento
              </motion.p>
            </div>
            
            <div className="hidden sm:block w-32"></div>
          </div>

          {/* Player Points */}
          {player && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card mb-10 text-center p-8 neon-glow"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.span
                  className="text-4xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {player.avatar}
                </motion.span>
                <div>
                  <p className="font-bold text-2xl text-gradient mb-2">{player.name}</p>
                  <div className="flex items-center justify-center gap-2">
                    <Star className="text-yellow-400" size={20} />
                    <p className="text-yellow-400 font-bold text-xl">{player.totalPoints} puntos totales</p>
                    <Star className="text-yellow-400" size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {categories.map((category, index) => {
              const isUnlocked = unlockedCategories.includes(category.id);
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 50, rotateY: -15 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
                  className={`category-card relative ${!isUnlocked ? 'opacity-60' : ''} ${isUnlocked ? 'neon-glow' : ''}`}
                  onClick={() => isUnlocked && handleCategorySelect(category.id)}
                  whileHover={isUnlocked ? { scale: 1.05, rotateY: 5 } : {}}
                  whileTap={isUnlocked ? { scale: 0.95 } : {}}
                >
                  {/* Lock Overlay */}
                  {!isUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-3xl backdrop-blur-sm z-10">
                      <div className="text-center">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Lock className="text-white/70 mx-auto mb-3" size={40} />
                        </motion.div>
                        <p className="text-white/90 text-base font-bold">
                          Requiere {category.requiredPoints} puntos
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Category Content */}
                  <div className="text-center p-6">
                    <motion.div
                      className="text-7xl sm:text-8xl mb-6"
                      animate={isUnlocked ? { 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      } : {}}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {category.icon}
                    </motion.div>
                    <h3 className="text-2xl sm:text-3xl font-black mb-4 text-gradient">{category.name}</h3>
                    <p className="text-white/90 text-base sm:text-lg mb-8 leading-relaxed font-medium">{category.description}</p>
                    
                    <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${category.color} text-white text-base font-bold shadow-xl`}>
                      <Star size={18} />
                      <span>{category.requiredPoints} pts</span>
                      <Star size={18} />
                    </div>
                  </div>

                  {/* Unlock Animation */}
                  {isUnlocked && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, delay: index * 0.1 + 0.5 }}
                      className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl neon-glow"
                    >
                      <motion.span
                        className="text-white text-lg font-bold"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        ✓
                      </motion.span>
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
            transition={{ delay: 0.8 }}
            className="mt-16 glass-card p-8 sm:p-10 text-center neon-glow"
          >
            <motion.h3
              className="text-3xl sm:text-4xl font-black mb-8 text-gradient"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎯 Tu Progreso Épico
            </motion.h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <motion.div
                className="stat-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl sm:text-4xl font-black text-green-400 mb-2">{unlockedCategories.length}</div>
                <div className="text-sm sm:text-base text-white/90 font-semibold">Categorías Desbloqueadas</div>
              </motion.div>
              <motion.div
                className="stat-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl sm:text-4xl font-black text-blue-400 mb-2">{categories.length - unlockedCategories.length}</div>
                <div className="text-sm sm:text-base text-white/90 font-semibold">Por Desbloquear</div>
              </motion.div>
              <motion.div
                className="stat-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl sm:text-4xl font-black text-yellow-400 mb-2">{player?.totalPoints || 0}</div>
                <div className="text-sm sm:text-base text-white/90 font-semibold">Puntos Totales</div>
              </motion.div>
              <motion.div
                className="stat-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl sm:text-4xl font-black text-purple-400 mb-2">
                  {categories.find(c => !unlockedCategories.includes(c.id))?.requiredPoints || 'MAX'}
                </div>
                <div className="text-sm sm:text-base text-white/90 font-semibold">Próximo Objetivo</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
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