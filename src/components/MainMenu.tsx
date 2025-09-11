import React from 'react';
import { motion } from 'framer-motion';
import { Play, Trophy, User, Star, Award, ArrowRight, Sparkles, BookOpen, Target, Zap, Users } from 'lucide-react';

interface MainMenuProps {
  onNavigate: (screen: string) => void;
  playerName: string;
}

export function MainMenu({ onNavigate, playerName }: MainMenuProps) {
  return (
    <div className="hero-modern min-h-screen relative">
      {/* Floating Background Elements */}
      <div className="floating-element floating-element-1"></div>
      <div className="floating-element floating-element-2"></div>
      <div className="floating-element floating-element-3"></div>
      
      <div className="hero-background-modern"></div>
      <div className="hero-content-modern">
        <div className="container-fluid section-space">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center mb-20"
            >
              {/* Logo */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
                className="mb-12"
              >
                <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-modern-lg mb-8 relative">
                  <BookOpen className="w-14 h-14 text-white" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 opacity-50 animate-pulse"></div>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="display-title mb-8"
              >
                QuizMania
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="body-text max-w-3xl mx-auto mb-12 text-xl"
              >
                La plataforma educativa más avanzada para desafiar tu conocimiento. 
                Explora múltiples categorías, compite con otros jugadores y alcanza la cima del ranking global.
              </motion.p>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex flex-wrap justify-center gap-4 mb-16"
              >
                <div className="badge-modern badge-primary-modern">
                  <Star className="w-4 h-4 mr-2" />
                  5 Categorías Únicas
                </div>
                <div className="badge-modern badge-success-modern">
                  <Award className="w-4 h-4 mr-2" />
                  Sistema de Logros
                </div>
                <div className="badge-modern badge-warning-modern">
                  <Trophy className="w-4 h-4 mr-2" />
                  Ranking Global
                </div>
                <div className="badge-modern badge-gray-modern">
                  <Target className="w-4 h-4 mr-2" />
                  100% Educativo
                </div>
              </motion.div>
            </motion.div>

            {/* Welcome Back Card */}
            {playerName && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="glass-card p-10 mb-16 text-center max-w-lg mx-auto"
              >
                <div className="flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6 text-indigo-500 mr-4" />
                  <h3 className="card-title text-white">¡Bienvenido de vuelta!</h3>
                  <Sparkles className="w-6 h-6 text-indigo-500 ml-4" />
                </div>
                <p className="text-3xl font-black text-gradient-modern">{playerName}</p>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="space-y-12"
            >
              {/* Primary CTA */}
              <div className="text-center">
                <button
                  onClick={() => onNavigate('categories')}
                  className="btn-primary btn-xl inline-flex items-center gap-4 shadow-modern-lg group"
                >
                  <Play className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-bold text-xl">Comenzar Aventura</span>
                  <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>

              {/* Secondary Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <button
                  onClick={() => onNavigate('leaderboard')}
                  className="btn-secondary btn-lg flex items-center justify-center gap-4 group"
                >
                  <Trophy className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-semibold">Ver Ranking</span>
                </button>

                <button
                  onClick={() => onNavigate('profile')}
                  className="btn-ghost btn-lg flex items-center justify-center gap-4 group"
                >
                  <User className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-semibold">{playerName ? 'Mi Perfil' : 'Crear Perfil'}</span>
                </button>
              </div>
            </motion.div>

            {/* Stats Preview */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              <div className="stat-modern">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-modern">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="stat-value-modern">5</div>
                <div className="stat-label-modern">Categorías Disponibles</div>
              </div>
              
              <div className="stat-modern">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-modern">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="stat-value-modern">25+</div>
                <div className="stat-label-modern">Preguntas Únicas</div>
              </div>
              
              <div className="stat-modern">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-modern">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="stat-value-modern">∞</div>
                <div className="stat-label-modern">Diversión Garantizada</div>
              </div>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="mt-24 pt-16 border-t border-slate-200/50 text-center"
            >
              <div className="glass-card p-8 max-w-md mx-auto">
                <p className="small-text mb-3 text-slate-600">Desarrollado con 💜 por</p>
                <p className="font-bold text-xl text-gradient-modern">César Eduardo González</p>
                <p className="small-text text-slate-600 mt-2">Analista en Sistemas</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}