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
      case 0: return <Trophy className="text-yellow-400" size={24} />;
      case 1: return <Medal className="text-gray-300" size={24} />;
      case 2: return <Award className="text-amber-600" size={24} />;
      default: return <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">{index + 1}</div>;
    }
  };

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(c => c.id === categoryId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen p-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => onNavigate('menu')}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Volver al Menú
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              🏆 Ranking Global
            </h1>
            <p className="text-white/70">Top 10 mejores puntajes</p>
          </div>
          
          <div></div>
        </div>

        {sortedLeaderboard.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="game-card text-center py-12"
          >
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold mb-4">¡Sé el primero!</h2>
            <p className="text-white/70 mb-6">
              Aún no hay puntajes registrados. ¡Juega una partida y establece el primer récord!
            </p>
            <button
              onClick={() => onNavigate('categories')}
              className="btn-primary"
            >
              Comenzar a Jugar
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {sortedLeaderboard.map((entry, index) => {
              const category = getCategoryInfo(entry.category);
              const isTopThree = index < 3;
              
              return (
                <motion.div
                  key={`${entry.playerId}-${entry.date.getTime()}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`game-card ${isTopThree ? 'ring-2 ring-yellow-400/50' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="flex-shrink-0">
                      {getRankIcon(index)}
                    </div>

                    {/* Player Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg truncate">{entry.playerName}</h3>
                        {category && (
                          <span className={`px-2 py-1 rounded-full text-xs bg-gradient-to-r ${category.color} text-white`}>
                            {category.icon} {category.name}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-white/70">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {entry.date.toLocaleDateString()}
                        </div>
                        {entry.streak > 0 && (
                          <div className="flex items-center gap-1">
                            <Zap size={14} className="text-orange-400" />
                            <span>Racha: {entry.streak}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-400">
                        {entry.score.toLocaleString()}
                      </div>
                      <div className="text-xs text-white/70">puntos</div>
                    </div>
                  </div>

                  {isTopThree && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-xs font-bold text-black"
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
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="game-card text-center">
              <div className="text-2xl font-bold text-blue-400">
                {sortedLeaderboard.length}
              </div>
              <div className="text-sm text-white/70">Jugadores</div>
            </div>
            
            <div className="game-card text-center">
              <div className="text-2xl font-bold text-green-400">
                {Math.max(...sortedLeaderboard.map(e => e.score)).toLocaleString()}
              </div>
              <div className="text-sm text-white/70">Mejor Puntaje</div>
            </div>
            
            <div className="game-card text-center">
              <div className="text-2xl font-bold text-orange-400">
                {Math.max(...sortedLeaderboard.map(e => e.streak))}
              </div>
              <div className="text-sm text-white/70">Mejor Racha</div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}