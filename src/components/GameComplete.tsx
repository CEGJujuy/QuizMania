import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, RotateCcw, Home, Share2, Target, Zap, Clock } from 'lucide-react';
import { GameSession } from '../types';
import { categories } from '../data/questions';

interface GameCompleteProps {
  session: GameSession;
  onNavigate: (screen: string) => void;
  onPlayAgain: () => void;
}

export function GameComplete({ session, onNavigate, onPlayAgain }: GameCompleteProps) {
  const category = categories.find(c => c.id === session.categoryId);
  const isSuccess = session.lives > 0;
  const accuracy = Math.round((session.answers.filter((a, i) => a !== null).length / session.answers.length) * 100);

  const getPerformanceMessage = () => {
    if (session.score >= 150) return "¡Increíble! Eres un verdadero genio 🧠";
    if (session.score >= 100) return "¡Excelente trabajo! 🌟";
    if (session.score >= 50) return "¡Bien hecho! 👏";
    return "¡Sigue practicando! 💪";
  };

  const shareScore = () => {
    if (navigator.share) {
      navigator.share({
        title: 'QuizMania - Mi Puntaje',
        text: `¡Acabo de conseguir ${session.score} puntos en ${category?.name}! 🎯`,
        url: window.location.href
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8"
    >
      <div className="glass-card max-w-lg w-full text-center p-8 sm:p-10">
        {/* Result Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-7xl sm:text-8xl mb-6"
        >
          {isSuccess ? '🎉' : '😔'}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl sm:text-4xl font-bold mb-4 text-gradient"
        >
          {isSuccess ? '¡Felicitaciones!' : '¡Inténtalo de nuevo!'}
        </motion.h1>

        {/* Performance Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-white/80 mb-8 text-lg font-light"
        >
          {getPerformanceMessage()}
        </motion.p>

        {/* Category */}
        {category && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${category.color} text-white font-semibold mb-8 shadow-lg text-lg`}
          >
            <span className="text-xl">{category.icon}</span>
            <span>{category.name}</span>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-4 sm:gap-6 mb-10"
        >
          <div className="stat-card">
            <Trophy className="text-yellow-400 mx-auto mb-3" size={28} />
            <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1">{session.score}</div>
            <div className="text-sm text-white/80 font-medium">Puntos</div>
          </div>
          
          <div className="stat-card">
            <Target className="text-blue-400 mx-auto mb-3" size={28} />
            <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1">{accuracy}%</div>
            <div className="text-sm text-white/80 font-medium">Precisión</div>
          </div>
          
          <div className="stat-card">
            <Zap className="text-orange-400 mx-auto mb-3" size={28} />
            <div className="text-2xl sm:text-3xl font-bold text-orange-400 mb-1">{session.streak}</div>
            <div className="text-sm text-white/80 font-medium">Mejor Racha</div>
          </div>
          
          <div className="stat-card">
            <Clock className="text-green-400 mx-auto mb-3" size={28} />
            <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-1">
              {Math.floor((Date.now() - session.startTime.getTime()) / 1000)}s
            </div>
            <div className="text-sm text-white/80 font-medium">Tiempo Total</div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-4"
        >
          <button
            onClick={onPlayAgain}
            className="btn-special w-full flex items-center justify-center gap-4 text-xl py-6"
          >
            <RotateCcw size={20} />
            <span className="font-black tracking-wider">JUGAR DE NUEVO</span>
          </button>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onNavigate('categories')}
              className="btn-secondary flex items-center justify-center gap-3 text-base py-4"
            >
              <Target size={18} />
              <span className="font-bold tracking-wide">Categorías</span>
            </button>

            <button
              onClick={() => onNavigate('leaderboard')}
              className="btn-success flex items-center justify-center gap-3 text-base py-4"
            >
              <Trophy size={18} />
              <span className="font-bold tracking-wide">Ranking</span>
            </button>
          </div>

          <button
            onClick={() => onNavigate('menu')}
            className="btn-ghost w-full flex items-center justify-center gap-3 py-4"
          >
            <Home size={18} />
            <span className="font-bold tracking-wide">Menú Principal</span>
          </button>

          {navigator.share && (
            <button
              onClick={shareScore}
              className="btn-ghost w-full flex items-center justify-center gap-3 py-4"
            >
              <Share2 size={18} />
              <span className="font-bold tracking-wide">Compartir Resultado</span>
            </button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}