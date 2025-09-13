import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Heart, Zap, ArrowLeft, CheckCircle, XCircle, BookOpen, Timer, Award } from 'lucide-react';
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
      <div className="hero-modern min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-modern mx-auto mb-6"></div>
          <p className="body-text text-xl">Cargando pregunta...</p>
        </div>
      </div>
    );
  }

  const progress = ((session.currentQuestionIndex + 1) / categoryQuestions.length) * 100;

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
          <div className="flex items-center justify-between mb-12">
            <button
              onClick={() => onNavigate('categories')}
              className="btn-ghost btn-md flex items-center gap-3"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Volver</span>
            </button>
            
            <div className={`px-8 py-4 rounded-full bg-gradient-to-r ${category.color} text-white font-bold shadow-modern-lg`}>
              <span className="text-2xl mr-3">{category.icon}</span>
              <span className="text-xl">{category.name}</span>
            </div>
            
            <div className="w-32"></div>
          </div>

          {/* Progress Bar */}
          <div className="mb-12 max-w-5xl mx-auto">
            <div className="flex justify-between text-slate-700 mb-4 font-bold text-lg">
              <span>Pregunta {session.currentQuestionIndex + 1} de {categoryQuestions.length}</span>
              <span>{Math.round(progress)}% completado</span>
            </div>
            <div className="progress-modern">
              <motion.div
                className="progress-fill-modern"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Game Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto">
            <div className="stat-modern">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="stat-value-modern text-indigo-600">{session.score}</div>
              <div className="stat-label-modern">Puntos</div>
            </div>
            
            <div className="stat-modern">
              <div className="flex items-center justify-center gap-2 mb-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Heart
                    key={i}
                    size={20}
                    className={i < session.lives ? 'text-red-500 fill-current' : 'text-slate-300'}
                  />
                ))}
              </div>
              <div className="stat-label-modern">Vidas</div>
            </div>
            
            <div className="stat-modern">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="stat-value-modern text-orange-600">{session.streak}</div>
              <div className="stat-label-modern">Racha</div>
            </div>
            
            <div className="stat-modern">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Timer className="w-6 h-6 text-white" />
              </div>
              <div className={`stat-value-modern ${session.timeRemaining <= 10 ? 'text-red-600' : 'text-emerald-600'}`}>
                {session.timeRemaining}
              </div>
              <div className="stat-label-modern">Tiempo</div>
            </div>
          </div>

          {/* Question */}
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="floating-card p-12 mb-12 max-w-5xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <span className={`badge-modern ${
                currentQuestion.difficulty === 'easy' ? 'badge-success-modern' :
                currentQuestion.difficulty === 'medium' ? 'badge-warning-modern' : 'badge-danger-modern'
              }`}>
                {currentQuestion.difficulty === 'easy' ? 'Fácil' :
                 currentQuestion.difficulty === 'medium' ? 'Medio' : 'Difícil'}
              </span>
              <span className="text-indigo-600 font-black text-2xl">+{currentQuestion.points} pts</span>
            </div>
            
            <h2 className="section-title mb-12 leading-relaxed text-center">
              {currentQuestion.question}
            </h2>

            <div className="grid gap-6">
              <AnimatePresence>
                {currentQuestion.options.map((option, index) => {
                  let optionClass = 'option-modern';
                  
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
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15, duration: 0.5 }}
                      onClick={() => handleAnswer(index)}
                      disabled={isAnswered}
                      className={`${optionClass} group`}
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-black text-slate-700 flex-shrink-0 text-xl">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="flex-1 text-left text-slate-700 font-semibold text-lg">{option}</span>
                        {showResult && index === currentQuestion.correctAnswer && (
                          <CheckCircle className="text-emerald-500" size={28} />
                        )}
                        {showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                          <XCircle className="text-red-500" size={28} />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>

            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200"
              >
                {selectedAnswer === currentQuestion.correctAnswer ? (
                  <div className="text-emerald-600 font-black text-2xl text-center">
                    🎉 ¡Correcto! +{currentQuestion.points + Math.floor(session.timeRemaining / 5)} puntos
                  </div>
                ) : selectedAnswer === null ? (
                  <div className="text-red-600 font-black text-2xl text-center">
                    ⏰ ¡Se acabó el tiempo! La respuesta correcta era: {currentQuestion.options[currentQuestion.correctAnswer]}
                  </div>
                ) : (
                  <div className="text-red-600 font-black text-2xl text-center">
                    ❌ Incorrecto. La respuesta correcta era: {currentQuestion.options[currentQuestion.correctAnswer]}
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}