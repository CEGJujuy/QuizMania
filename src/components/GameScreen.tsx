import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Heart, Zap, ArrowLeft, CheckCircle, XCircle, BookOpen } from 'lucide-react';
import { useGameLogic } from '../hooks/useGameLogic';
import { Player, LeaderboardEntry, GameSession } from '../types';
import { categories } from '../data/questions';

interface GameScreenProps {
  categoryId: string;
  player: Player | null;
  onNavigate: (screen: string) => void;
  onGameComplete: (session: GameSession) => void;
  updateLeaderboard: (entry: LeaderboardEntry) => void;
  updatePlayer: (player: Player) => void;
}

export function GameScreen({
  categoryId,
  player,
  onNavigate,
  onGameComplete,
  updateLeaderboard,
  updatePlayer
}: GameScreenProps) {
  const {
    session,
    currentQuestion,
    selectedAnswer,
    showResult,
    isAnswered,
    handleAnswer,
    categoryQuestions
  } = useGameLogic(categoryId, player, onGameComplete, updateLeaderboard, updatePlayer);

  const category = categories.find(c => c.id === categoryId);

  if (!currentQuestion || !category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-body">Cargando pregunta...</p>
        </div>
      </div>
    );
  }

  const progress = ((session.currentQuestionIndex + 1) / categoryQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container-custom section-padding">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => onNavigate('categories')}
            className="btn btn-ghost btn-md flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
          
          <div className={`px-6 py-3 rounded-2xl bg-gradient-to-r ${category.color} text-white font-semibold shadow-lg`}>
            <span className="text-lg">{category.icon}</span>
            <span className="ml-2">{category.name}</span>
          </div>
          
          <div className="w-20"></div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 max-w-4xl mx-auto">
          <div className="flex justify-between text-slate-600 mb-3 font-medium">
            <span>Pregunta {session.currentQuestionIndex + 1} de {categoryQuestions.length}</span>
            <span>{Math.round(progress)}% completado</span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
          <div className="stat-card">
            <div className="stat-value text-blue-600">{session.score}</div>
            <div className="stat-label">Puntos</div>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-center gap-1 mb-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart
                  key={i}
                  size={18}
                  className={i < session.lives ? 'text-red-500 fill-current' : 'text-slate-300'}
                />
              ))}
            </div>
            <div className="stat-label">Vidas</div>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-center gap-1 mb-2">
              <Zap size={18} className="text-orange-500" />
              <span className="stat-value text-orange-600">{session.streak}</span>
            </div>
            <div className="stat-label">Racha</div>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-center gap-1 mb-2">
              <Clock size={18} className={session.timeRemaining <= 10 ? 'text-red-500' : 'text-blue-500'} />
              <span className={`stat-value ${session.timeRemaining <= 10 ? 'text-red-600' : 'text-blue-600'}`}>
                {session.timeRemaining}
              </span>
            </div>
            <div className="stat-label">Tiempo</div>
          </div>
        </div>

        {/* Question */}
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="card-elevated p-8 mb-8 max-w-4xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
            <span className={`badge ${
              currentQuestion.difficulty === 'easy' ? 'badge-success' :
              currentQuestion.difficulty === 'medium' ? 'badge-warning' : 'badge-danger'
            }`}>
              {currentQuestion.difficulty === 'easy' ? 'Fácil' :
               currentQuestion.difficulty === 'medium' ? 'Medio' : 'Difícil'}
            </span>
            <span className="text-blue-600 font-bold text-lg">+{currentQuestion.points} pts</span>
          </div>
          
          <h2 className="heading-secondary mb-8 leading-relaxed">
            {currentQuestion.question}
          </h2>

          <div className="grid gap-4">
            <AnimatePresence>
              {currentQuestion.options.map((option, index) => {
                let optionClass = 'question-option';
                
                if (showResult) {
                  if (index === currentQuestion.correctAnswer) {
                    optionClass += ' correct';
                  } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                    optionClass += ' incorrect';
                  }
                } else if (selectedAnswer === index) {
                  optionClass += ' selected';
                }

                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleAnswer(index)}
                    disabled={isAnswered}
                    className={optionClass}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 flex-shrink-0">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="flex-1 text-left text-slate-700 font-medium">{option}</span>
                      {showResult && index === currentQuestion.correctAnswer && (
                        <CheckCircle className="text-emerald-500" size={24} />
                      )}
                      {showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                        <XCircle className="text-red-500" size={24} />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-6 rounded-2xl bg-slate-50 border border-slate-200"
            >
              {selectedAnswer === currentQuestion.correctAnswer ? (
                <div className="text-emerald-600 font-bold text-lg">
                  ¡Correcto! +{currentQuestion.points + Math.floor(session.timeRemaining / 5)} puntos
                </div>
              ) : selectedAnswer === null ? (
                <div className="text-red-600 font-bold text-lg">
                  ¡Se acabó el tiempo! La respuesta correcta era: {currentQuestion.options[currentQuestion.correctAnswer]}
                </div>
              ) : (
                <div className="text-red-600 font-bold text-lg">
                  Incorrecto. La respuesta correcta era: {currentQuestion.options[currentQuestion.correctAnswer]}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}