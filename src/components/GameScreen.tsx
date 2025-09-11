import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Heart, Zap, ArrowLeft } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Cargando pregunta...</p>
        </div>
      </div>
    );
  }

  const progress = ((session.currentQuestionIndex + 1) / categoryQuestions.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-4 sm:p-6 lg:p-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
          <button
            onClick={() => onNavigate('categories')}
            className="btn-ghost flex items-center gap-2 self-start sm:self-center"
          >
            <ArrowLeft size={20} />
            Volver
          </button>
          
          <div className={`px-6 py-3 rounded-full bg-gradient-to-r ${category.color} text-white font-semibold shadow-lg text-lg`}>
            {category.icon} {category.name}
          </div>
          
          <div className="hidden sm:block w-24"></div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm sm:text-base text-white/80 mb-3 font-medium">
            <span>Pregunta {session.currentQuestionIndex + 1} de {categoryQuestions.length}</span>
            <span>Progreso: {Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 shadow-inner">
            <motion.div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="stat-card">
            <div className="text-xl sm:text-2xl font-bold text-yellow-400 mb-1">{session.score}</div>
            <div className="text-xs sm:text-sm text-white/80 font-medium">Puntos</div>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-center gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart
                  key={i}
                  size={18}
                  className={i < session.lives ? 'text-red-500 fill-current' : 'text-white/30'}
                />
              ))}
            </div>
            <div className="text-xs sm:text-sm text-white/80 font-medium mt-1">Vidas</div>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-center gap-1">
              <Zap size={18} className="text-orange-400" />
              <span className="text-xl sm:text-2xl font-bold text-orange-400">{session.streak}</span>
            </div>
            <div className="text-xs sm:text-sm text-white/80 font-medium">Racha</div>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-center gap-1">
              <Clock size={18} className={session.timeRemaining <= 10 ? 'text-red-400' : 'text-blue-400'} />
              <span className={`text-xl sm:text-2xl font-bold ${session.timeRemaining <= 10 ? 'text-red-400' : 'text-blue-400'}`}>
                {session.timeRemaining}
              </span>
            </div>
            <div className="text-xs sm:text-sm text-white/80 font-medium">Tiempo</div>
          </div>
        </div>

        {/* Question */}
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6 sm:p-8 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              currentQuestion.difficulty === 'easy' ? 'bg-green-500' :
              currentQuestion.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
            }`}>
              {currentQuestion.difficulty === 'easy' ? 'Fácil' :
               currentQuestion.difficulty === 'medium' ? 'Medio' : 'Difícil'}
            </span>
            <span className="text-yellow-400 font-bold text-lg">+{currentQuestion.points} pts</span>
          </div>
          
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-8 leading-relaxed">
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
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg flex-shrink-0">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="flex-1 text-left text-base sm:text-lg">{option}</span>
                      {showResult && index === currentQuestion.correctAnswer && (
                        <div className="text-green-400 text-xl">✓</div>
                      )}
                      {showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                        <div className="text-red-400 text-xl">✗</div>
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
              className="mt-6 p-5 rounded-2xl bg-white/10 border border-white/20"
            >
              {selectedAnswer === currentQuestion.correctAnswer ? (
                <div className="text-green-400 font-bold text-lg">
                  ¡Correcto! +{currentQuestion.points + Math.floor(session.timeRemaining / 5)} puntos
                </div>
              ) : selectedAnswer === null ? (
                <div className="text-red-400 font-bold text-lg">
                  ¡Se acabó el tiempo! La respuesta correcta era: {currentQuestion.options[currentQuestion.correctAnswer]}
                </div>
              ) : (
                <div className="text-red-400 font-bold text-lg">
                  Incorrecto. La respuesta correcta era: {currentQuestion.options[currentQuestion.correctAnswer]}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}