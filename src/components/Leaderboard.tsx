import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, ArrowLeft, Calendar, Zap } from 'lucide-react';
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
      case 0: return <Trophy className="text-amber-500" size={24} />;
      case 1: return <Medal className="text-slate-400" size={24} />;
      case 2: return <Award className="text-amber-600" size={24} />;
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
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
          <button
            onClick={() => onNavigate('menu')}
            className="btn-ghost flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al Menú
          </button>
          
          <div className="text-center flex-1">
            <h1 className="heading-secondary mb-4">
              <span className="text-gradient">🏆 Ranking Global</span>
            </h1>
            <p className="text-body">Top 10 mejores puntajes</p>
          </div>
          
          <div className="hidden sm:block w-32"></div>
        </div>

        {sortedLeaderboard.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card-elevated text-center py-16 px-8"
          >
            <div className="text-8xl mb-6">🎯</div>
            <h2 className="text-3xl font-bold mb-6 text-gradient">¡Sé el primero!</h2>
            <p className="text-body mb-8 max-w-md mx-auto">
              Aún no hay puntajes registrados. ¡Juega una partida y establece el primer récord!
            </p>
            <button
              onClick={() => onNavigate('categories')}
              className="btn-primary btn-large"
            >
              Comenzar a Jugar
            </button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {sortedLeaderboard.map((entry, index) => {
              const category = getCategoryInfo(entry.category);
              const isTopThree = index < 3;
              
              return (
                <motion.div
                  key={`${entry.playerId}-${entry.date.getTime()}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`card-elevated p-6 ${isTopThree ? 'ring-2 ring-amber-200' : ''}`}
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
                      className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg"
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
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            <div className="stat-card">
              <div className="stat-value text-blue-600">{sortedLeaderboard.length}</div>
              <div className="stat-label">Jugadores</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-value text-emerald-600">
                {Math.max(...sortedLeaderboard.map(e => e.score)).toLocaleString()}
              </div>
              <div className="stat-label">Mejor Puntaje</div>
            </div>
            
            <div className="stat-card">
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