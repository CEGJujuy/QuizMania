import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Star, ArrowLeft, Users, Target, Zap, ChevronRight } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container-custom section-padding">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => handleNavigate('menu')}
            className="btn btn-ghost btn-md flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
          
          <div className="text-center flex-1 mx-8">
            <h1 className="heading-secondary mb-2">Elige tu Categoría</h1>
            <p className="text-body">Selecciona una categoría y demuestra tu conocimiento</p>
          </div>
          
          <div className="w-20"></div>
        </div>

        {/* Player Stats */}
        {player && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-elevated p-8 mb-12"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="text-5xl">{player.avatar}</div>
              <div className="text-center sm:text-left">
                <h3 className="heading-tertiary mb-2">{player.name}</h3>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  <span className="text-lg font-semibold text-amber-600">
                    {player.totalPoints.toLocaleString()} puntos
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Categories Grid */}
        <div className="grid-responsive mb-16">
          {categories.map((category, index) => {
            const isUnlocked = unlockedCategories.includes(category.id);
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`category-card ${!isUnlocked ? 'locked' : ''}`}
                onClick={() => isUnlocked && handleCategorySelect(category.id)}
              >
                {/* Lock Overlay */}
                {!isUnlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/95 rounded-xl backdrop-blur-sm z-10">
                    <div className="text-center">
                      <Lock className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-600 font-semibold">
                        Requiere {category.requiredPoints} puntos
                      </p>
                    </div>
                  </div>
                )}

                {/* Category Content */}
                <div className="text-center">
                  <div className="text-6xl mb-6">{category.icon}</div>
                  <h3 className="heading-tertiary mb-4">{category.name}</h3>
                  <p className="text-body mb-6">{category.description}</p>
                  
                  <div className="flex items-center justify-center gap-2">
                    <div className={`badge ${isUnlocked ? 'badge-success' : 'badge-gray'}`}>
                      {category.requiredPoints} pts requeridos
                    </div>
                  </div>

                  {isUnlocked && (
                    <div className="mt-4 flex items-center justify-center text-blue-600 font-medium">
                      <span>Jugar ahora</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  )}
                </div>

                {/* Unlock Indicator */}
                {isUnlocked && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Progress Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-elevated p-8"
        >
          <h3 className="heading-tertiary mb-8 text-center">Tu Progreso</h3>
          <div className="grid-responsive-4">
            <div className="stat-card border-0 shadow-none">
              <Users className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
              <div className="stat-value text-emerald-600">{unlockedCategories.length}</div>
              <div className="stat-label">Desbloqueadas</div>
            </div>
            <div className="stat-card border-0 shadow-none">
              <Target className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <div className="stat-value text-blue-600">{categories.length - unlockedCategories.length}</div>
              <div className="stat-label">Por Desbloquear</div>
            </div>
            <div className="stat-card border-0 shadow-none">
              <Star className="w-8 h-8 text-amber-500 mx-auto mb-3" />
              <div className="stat-value text-amber-600">{player?.totalPoints || 0}</div>
              <div className="stat-label">Puntos Totales</div>
            </div>
            <div className="stat-card border-0 shadow-none">
              <Zap className="w-8 h-8 text-purple-500 mx-auto mb-3" />
              <div className="stat-value text-purple-600">
                {categories.find(c => !unlockedCategories.includes(c.id))?.requiredPoints || 'MAX'}
              </div>
              <div className="stat-label">Próximo Objetivo</div>
            </div>
          </div>
        </motion.div>
      </div>
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