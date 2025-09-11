import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, ArrowLeft, Calendar, Zap, Crown, Target } from 'lucide-react';
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
      case 0: return <Crown className="text-amber-500" size={24} />;
      case 1: return <Trophy className="text-slate-400" size={24} />;
      case 2: return <Medal className="text-amber-600" size={24} />;
      default: return <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">{index + 1}</div>;
    }
  };

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(c => c.id === categoryId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container-custom section-padding">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => onNavigate('menu')}
            className="btn btn-ghost btn-md flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
          
          <div className="text-center flex-1 mx-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-lg mb-4">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h1 className="heading-secondary mb-2">🏆 Ranking Global</h1>
            <p className="text-body">Top 10 mejores puntajes</p>
          </div>
          
          <div className="w-20"></div>
        </div>

        {sortedLeaderboard.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card-elevated text-center py-16 px-8 max-w-2xl mx-auto"
          >
            <div className="text-8xl mb-6">🎯</div>
            <h2 className="heading-secondary mb-6 text-gradient">¡Sé el primero!</h2>
            <p className="text-body mb-8 max-w-md mx-auto">
              Aún no hay puntajes registrados. ¡Juega una partida y establece el primer récord!
            </p>
            <button
              onClick={() => onNavigate('categories')}
              className="btn btn-primary btn-lg"
            >
              Comenzar a Jugar
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4 max-w-4xl mx-auto">
            {sortedLeaderboard.map((entry, index) => {
              const category = getCategoryInfo(entry.category);
              const isTopThree = index < 3;
              
              return (
                <motion.div
                  key={`${entry.playerId}-${entry.date.getTime()}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`card-elevated p-6 relative ${isTopThree ? 'ring-2 ring-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50' : ''}`}
                >
                  <div className="flex items-center gap-6">
                    {/* Rank */}
                    <div className="flex-shrink-0">
                      {getRankIcon(index)}
                    </div>

                    {/* Player Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <h3 className="font-bold text-xl text-slate-800 truncate">{entry.playerName}</h3>
                        {category && (
                          <span className={`px-3 py-1 rounded-full text-xs bg-gradient-to-r ${category.color} text-white font-medium shadow-sm`}>
                            {category.icon} {category.name}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {entry.date.toLocaleDateString()}
                        </div>
                        {entry.streak > 0 && (
                          <div className="flex items-center gap-1">
                            <Zap size={14} className="text-orange-500" />
                            <span className="font-medium">Racha: {entry.streak}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600">
                        {entry.score.toLocaleString()}
                      </div>
                      <div className="text-sm text-slate-600 font-medium">puntos</div>
                    </div>
                  </div>

                  {isTopThree && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            <div className="stat-card">
              <Target className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <div className="stat-value text-blue-600">{sortedLeaderboard.length}</div>
              <div className="stat-label">Jugadores</div>
            </div>
            
            <div className="stat-card">
              <Trophy className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
              <div className="stat-value text-emerald-600">
                {Math.max(...sortedLeaderboard.map(e => e.score)).toLocaleString()}
              </div>
              <div className="stat-label">Mejor Puntaje</div>
            </div>
            
            <div className="stat-card">
              <Zap className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <div className="stat-value text-orange-600">
                {Math.max(...sortedLeaderboard.map(e => e.streak))}
              </div>
              <div className="stat-label">Mejor Racha</div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}