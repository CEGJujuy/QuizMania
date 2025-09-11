import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, ArrowLeft, Calendar, Zap, Crown, Target, Star } from 'lucide-react';
import { LeaderboardEntry } from '../types';
import { categories } from '../data/questions';

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
  onNavigate: (screen: string) => void;
}

export function Leaderboard({ leaderboard, onNavigate }: LeaderboardProps) {
  const sortedLeaderboard = [...leaderboard]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Crown className="text-amber-500" size={28} />;
      case 1: return <Trophy className="text-slate-400" size={28} />;
      case 2: return <Medal className="text-amber-600" size={28} />;
      default: return <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-sm font-bold text-white">{index + 1}</div>;
    }
  };

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(c => c.id === categoryId);
  };

  return (
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
              onClick={() => onNavigate('menu')}
              className="btn-ghost btn-md flex items-center gap-3"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Volver</span>
            </button>
            
            <div className="text-center flex-1 mx-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl shadow-modern-lg mb-6">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h1 className="section-title mb-4">🏆 Ranking Global</h1>
              <p className="body-text text-xl">Top 10 mejores puntajes de todos los tiempos</p>
            </div>
            
            <div className="w-32"></div>
          </div>

          {sortedLeaderboard.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="floating-card text-center py-20 px-12 max-w-3xl mx-auto"
            >
              <div className="text-9xl mb-8">🎯</div>
              <h2 className="section-title mb-8 text-gradient-modern">¡Sé el primero!</h2>
              <p className="body-text mb-12 max-w-lg mx-auto text-xl">
                Aún no hay puntajes registrados. ¡Juega una partida y establece el primer récord histórico!
              </p>
              <button
                onClick={() => onNavigate('categories')}
                className="btn-primary btn-xl"
              >
                Comenzar Aventura
              </button>
            </motion.div>
          ) : (
            <div className="space-y-6 max-w-5xl mx-auto">
              {sortedLeaderboard.map((entry, index) => {
                const category = getCategoryInfo(entry.category);
                const isTopThree = index < 3;
                
                return (
                  <motion.div
                    key={`${entry.playerId}-${entry.date.getTime()}`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                    className={`floating-card p-8 relative ${isTopThree ? 'ring-4 ring-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50' : ''}`}
                  >
                    <div className="flex items-center gap-8">
                      {/* Rank */}
                      <div className="flex-shrink-0">
                        {getRankIcon(index)}
                      </div>

                      {/* Player Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                          <h3 className="font-black text-2xl text-slate-800 truncate">{entry.playerName}</h3>
                          {category && (
                            <span className={`px-4 py-2 rounded-full text-sm bg-gradient-to-r ${category.color} text-white font-bold shadow-md`}>
                              {category.icon} {category.name}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span className="font-semibold">{entry.date.toLocaleDateString()}</span>
                          </div>
                          {entry.streak > 0 && (
                            <div className="flex items-center gap-2">
                              <Zap size={16} className="text-orange-500" />
                              <span className="font-semibold">Racha: {entry.streak}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Score */}
                      <div className="text-right">
                        <div className="text-4xl font-black text-gradient-modern">
                          {entry.score.toLocaleString()}
                        </div>
                        <div className="text-sm text-slate-600 font-bold">puntos</div>
                      </div>
                    </div>

                    {isTopThree && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.15, type: "spring", stiffness: 200 }}
                        className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center text-lg font-black text-white shadow-modern"
                      >
                        {index + 1}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Stats */}
          {sortedLeaderboard.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              <div className="stat-modern">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="stat-value-modern text-indigo-600">{sortedLeaderboard.length}</div>
                <div className="stat-label-modern">Jugadores Registrados</div>
              </div>
              
              <div className="stat-modern">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div className="stat-value-modern text-emerald-600">
                  {Math.max(...sortedLeaderboard.map(e => e.score)).toLocaleString()}
                </div>
                <div className="stat-label-modern">Mejor Puntaje</div>
              </div>
              
              <div className="stat-modern">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="stat-value-modern text-orange-600">
                  {Math.max(...sortedLeaderboard.map(e => e.streak))}
                </div>
                <div className="stat-label-modern">Mejor Racha</div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}