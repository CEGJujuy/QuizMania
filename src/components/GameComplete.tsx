import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, RotateCcw, Home, Share2, Target, Zap, Clock, Star, Award } from 'lucide-react';
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
    <div className="hero-modern min-h-screen flex items-center justify-center relative">
      {/* Floating Background Elements */}
      <div className="floating-element floating-element-1"></div>
      <div className="floating-element floating-element-2"></div>
      <div className="floating-element floating-element-3"></div>
      
      <div className="hero-background-modern"></div>
      <div className="hero-content-modern">
        <div className="container-fluid">
          <div className="floating-card max-w-2xl mx-auto text-center p-12">
            {/* Result Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
              className="text-9xl mb-8"
            >
              {isSuccess ? '🎉' : '😔'}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="section-title mb-6"
            >
              {isSuccess ? '¡Felicitaciones!' : '¡Inténtalo de nuevo!'}
            </motion.h1>

            {/* Performance Message */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="body-text mb-12 text-xl"
            >
              {getPerformanceMessage()}
            </motion.p>

            {/* Category */}
            {category && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className={`inline-flex items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r ${category.color} text-white font-bold mb-12 shadow-modern-lg text-xl`}
              >
                <span className="text-2xl">{category.icon}</span>
                <span>{category.name}</span>
              </motion.div>
            )}

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 gap-8 mb-12"
            >
              <div className="stat-modern border-0 shadow-none">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div className="stat-value-modern text-amber-600">{session.score}</div>
                <div className="stat-label-modern">Puntos Obtenidos</div>
              </div>
              
              <div className="stat-modern border-0 shadow-none">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="stat-value-modern text-indigo-600">{accuracy}%</div>
                <div className="stat-label-modern">Precisión</div>
              </div>
              
              <div className="stat-modern border-0 shadow-none">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="stat-value-modern text-orange-600">{session.streak}</div>
                <div className="stat-label-modern">Mejor Racha</div>
              </div>
              
              <div className="stat-modern border-0 shadow-none">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="stat-value-modern text-emerald-600">
                  {Math.floor((Date.now() - session.startTime.getTime()) / 1000)}s
                </div>
                <div className="stat-label-modern">Tiempo Total</div>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="space-y-6"
            >
              <button
                onClick={onPlayAgain}
                className="btn-primary btn-xl w-full flex items-center justify-center gap-4"
              >
                <RotateCcw size={24} />
                <span className="font-black text-xl">Jugar de Nuevo</span>
              </button>

              <div className="grid grid-cols-2 gap-6">
                <button
                  onClick={() => onNavigate('categories')}
                  className="btn-secondary btn-lg flex items-center justify-center gap-3"
                >
                  <Target size={20} />
                  <span className="font-bold">Categorías</span>
                </button>

                <button
                  onClick={() => onNavigate('leaderboard')}
                  className="btn-success btn-lg flex items-center justify-center gap-3"
                >
                  <Trophy size={20} />
                  <span className="font-bold">Ranking</span>
                </button>
              </div>

              <button
                onClick={() => onNavigate('menu')}
                className="btn-ghost btn-lg w-full flex items-center justify-center gap-3"
              >
                <Home size={20} />
                <span className="font-bold">Menú Principal</span>
              </button>

              {navigator.share && (
                <button
                  onClick={shareScore}
                  className="btn-ghost btn-lg w-full flex items-center justify-center gap-3"
                >
                  <Share2 size={20} />
                  <span className="font-bold">Compartir Resultado</span>
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}