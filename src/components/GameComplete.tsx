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
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="game-card max-w-md w-full text-center">
        {/* Result Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-6xl mb-4"
        >
          {isSuccess ? '🎉' : '😔'}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold mb-2"
        >
          {isSuccess ? '¡Felicitaciones!' : '¡Inténtalo de nuevo!'}
        </motion.h1>

        {/* Performance Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-white/80 mb-6"
        >
          {getPerformanceMessage()}
        </motion.p>

        {/* Category */}
        {category && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${category.color} text-white font-bold mb-6`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          <div className="bg-white/10 rounded-lg p-4">
            <Trophy className="text-yellow-400 mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold text-yellow-400">{session.score}</div>
            <div className="text-xs text-white/70">Puntos</div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <Target className="text-blue-400 mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold text-blue-400">{accuracy}%</div>
            <div className="text-xs text-white/70">Precisión</div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <Zap className="text-orange-400 mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold text-orange-400">{session.streak}</div>
            <div className="text-xs text-white/70">Mejor Racha</div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <Clock className="text-green-400 mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold text-green-400">
              {Math.floor((Date.now() - session.startTime.getTime()) / 1000)}s
            </div>
            <div className="text-xs text-white/70">Tiempo Total</div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-3"
        >
          <button
            onClick={onPlayAgain}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} />
            Jugar de Nuevo
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onNavigate('categories')}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <Target size={16} />
              Categorías
            </button>

            <button
              onClick={() => onNavigate('leaderboard')}
              className="btn-success flex items-center justify-center gap-2"
            >
              <Trophy size={16} />
              Ranking
            </button>
          </div>

          <button
            onClick={() => onNavigate('menu')}
            className="w-full py-2 text-white/70 hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <Home size={16} />
            Menú Principal
          </button>

          {navigator.share && (
            <button
              onClick={shareScore}
              className="w-full py-2 text-white/70 hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <Share2 size={16} />
              Compartir Resultado
            </button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}