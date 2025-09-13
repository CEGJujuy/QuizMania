import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Star, ArrowLeft, Users, Target, Zap, ChevronRight, BookOpen, Crown, Award } from 'lucide-react';

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
    <div className="hero-modern min-h-screen relative">
      {/* Floating Background Elements */}
      <div className="floating-element floating-element-1"></div>
      <div className="floating-element floating-element-2"></div>
      <div className="floating-element floating-element-3"></div>
      
      <div className="hero-background-modern"></div>
      <div className="hero-content-modern">
        <div className="container-fluid section-space">
          {/* Header */}
          <div className="flex items-center justify-between mb-16">
            <button
              onClick={() => handleNavigate('menu')}
              className="btn-ghost btn-md flex items-center gap-3"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Volver</span>
            </button>
            
            <div className="text-center flex-1 mx-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl shadow-modern-lg mb-6">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h1 className="section-title mb-4">Elige tu Categoría</h1>
              <p className="body-text text-xl">Selecciona una categoría y demuestra tu conocimiento</p>
            </div>
            
            <div className="w-32"></div>
          </div>

          {/* Player Stats */}
          {player && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-10 mb-16 max-w-3xl mx-auto"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <div className="text-8xl">{player.avatar}</div>
                <div className="text-center sm:text-left">
                  <h3 className="card-title mb-4 text-white">{player.name}</h3>
                  <div className="flex items-center justify-center sm:justify-start gap-3">
                    <Crown className="w-6 h-6 text-amber-400" />
                    <span className="text-2xl font-bold text-gradient-modern">
                      {player.totalPoints.toLocaleString()} puntos
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Categories Grid */}
          <div className="grid-modern mb-20 max-w-6xl mx-auto">
            {categories.map((category, index) => {
              const isUnlocked = unlockedCategories.includes(category.id);
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className={`category-modern group ${!isUnlocked ? 'locked' : ''}`}
                  onClick={() => isUnlocked && handleCategorySelect(category.id)}
                >
                  {/* Lock Overlay */}
                  {!isUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-3xl z-10">
                      <div className="text-center">
                        <Lock className="w-16 h-16 text-slate-400 mx-auto mb-6" />
                        <p className="text-slate-600 font-bold text-lg">
                          Requiere {category.requiredPoints} puntos
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Category Content */}
                  <div className="text-center relative z-0">
                    <div className="text-8xl mb-8">{category.icon}</div>
                    <h3 className="card-title mb-6">{category.name}</h3>
                    <p className="body-text mb-8">{category.description}</p>
                    
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <div className={`badge-modern ${isUnlocked ? 'badge-success-modern' : 'badge-gray-modern'}`}>
                        {category.requiredPoints} pts requeridos
                      </div>
                    </div>

                    {isUnlocked && (
                      <div className="flex items-center justify-center text-indigo-600 font-bold text-lg">
                        <span>Jugar ahora</span>
                        <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    )}
                  </div>

                  {/* Unlock Indicator */}
                  {isUnlocked && (
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-modern">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Progress Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="floating-card p-12 max-w-5xl mx-auto"
          >
            <h3 className="section-title mb-12 text-center">Tu Progreso</h3>
            <div className="grid-modern-4">
              <div className="stat-modern border-0 shadow-none">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="stat-value-modern text-emerald-600">{unlockedCategories.length}</div>
                <div className="stat-label-modern">Desbloqueadas</div>
              </div>
              
              <div className="stat-modern border-0 shadow-none">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="stat-value-modern text-indigo-600">{categories.length - unlockedCategories.length}</div>
                <div className="stat-label-modern">Por Desbloquear</div>
              </div>
              
              <div className="stat-modern border-0 shadow-none">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div className="stat-value-modern text-amber-600">{player?.totalPoints || 0}</div>
                <div className="stat-label-modern">Puntos Totales</div>
              </div>
              
              <div className="stat-modern border-0 shadow-none">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="stat-value-modern text-purple-600">
                  {categories.find(c => !unlockedCategories.includes(c.id))?.requiredPoints || 'MAX'}
                </div>
                <div className="stat-label-modern">Próximo Objetivo</div>
              </div>
            </div>
          </motion.div>
        </div>
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