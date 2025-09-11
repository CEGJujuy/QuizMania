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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="container-custom">
        <div className="card-elevated max-w-lg mx-auto text-center p-10">
          {/* Result Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-8xl mb-6"
          >
            {isSuccess ? '🎉' : '😔'}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="heading-secondary mb-4"
          >
            {isSuccess ? '¡Felicitaciones!' : '¡Inténtalo de nuevo!'}
          </motion.h1>

          {/* Performance Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-body mb-8"
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
            className="grid grid-cols-2 gap-6 mb-10"
          >
            <div className="stat-card border-0 shadow-none">
              <Trophy className="text-amber-500 mx-auto mb-3" size={28} />
              <div className="stat-value text-amber-600">{session.score}</div>
              <div className="stat-label">Puntos</div>
            </div>
            
            <div className="stat-card border-0 shadow-none">
              <Target className="text-blue-500 mx-auto mb-3" size={28} />
              <div className="stat-value text-blue-600">{accuracy}%</div>
              <div className="stat-label">Precisión</div>
            </div>
            
            <div className="stat-card border-0 shadow-none">
              <Zap className="text-orange-500 mx-auto mb-3" size={28} />
              <div className="stat-value text-orange-600">{session.streak}</div>
              <div className="stat-label">Mejor Racha</div>
            </div>
            
            <div className="stat-card border-0 shadow-none">
              <Clock className="text-emerald-500 mx-auto mb-3" size={28} />
              <div className="stat-value text-emerald-600">
                {Math.floor((Date.now() - session.startTime.getTime()) / 1000)}s
              </div>
              <div className="stat-label">Tiempo Total</div>
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
              className="btn btn-primary btn-xl w-full flex items-center justify-center gap-3"
            >
              <RotateCcw size={20} />
              <span className="font-bold">Jugar de Nuevo</span>
            </button>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => onNavigate('categories')}
                className="btn btn-secondary btn-lg flex items-center justify-center gap-2"
              >
                <Target size={18} />
                <span>Categorías</span>
              </button>

              <button
                onClick={() => onNavigate('leaderboard')}
                className="btn btn-success btn-lg flex items-center justify-center gap-2"
              >
                <Trophy size={18} />
                <span>Ranking</span>
              </button>
            </div>

            <button
              onClick={() => onNavigate('menu')}
              className="btn btn-ghost btn-lg w-full flex items-center justify-center gap-2"
            >
              <Home size={18} />
              <span>Menú Principal</span>
            </button>

            {navigator.share && (
              <button
                onClick={shareScore}
                className="btn btn-ghost btn-lg w-full flex items-center justify-center gap-2"
              >
                <Share2 size={18} />
                <span>Compartir Resultado</span>
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}