import React from 'react';
import { motion } from 'framer-motion';
import { Play, Trophy, User, Star, Award, ArrowRight, Sparkles } from 'lucide-react';

interface MainMenuProps {
  onNavigate: (screen: string) => void;
  playerName: string;
}

export function MainMenu({ onNavigate, playerName }: MainMenuProps) {
  return (
    <div className="hero-section min-h-screen">
      <div className="hero-background"></div>
      <div className="hero-content">
        <div className="container-custom section-padding">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              {/* Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-8"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl shadow-lg mb-6">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-3xl text-white"
                  >
                    🧠
                  </motion.div>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="heading-primary mb-6"
              >
                <span className="text-gradient">QuizMania</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-body max-w-2xl mx-auto mb-8"
              >
                Desafía tu conocimiento con nuestra plataforma de trivia interactiva. 
                Múltiples categorías, sistema de puntuación avanzado y ranking global.
              </motion.p>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-wrap justify-center gap-3 mb-12"
              >
                <div className="badge badge-primary">
                  <Star className="w-3 h-3 mr-2" />
                  5 Categorías
                </div>
                <div className="badge badge-success">
                  <Award className="w-3 h-3 mr-2" />
                  Sistema de Logros
                </div>
                <div className="badge badge-warning">
                  <Trophy className="w-3 h-3 mr-2" />
                  Ranking Global
                </div>
              </motion.div>
            </motion.div>

            {/* Welcome Back Card */}
            {playerName && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="card-elevated p-8 mb-12 text-center"
              >
                <div className="flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5 text-blue-500 mr-3" />
                  <h3 className="heading-tertiary">¡Bienvenido de vuelta!</h3>
                  <Sparkles className="w-5 h-5 text-blue-500 ml-3" />
                </div>
                <p className="text-2xl font-bold text-gradient">{playerName}</p>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="space-y-6"
            >
              {/* Primary CTA */}
              <div className="text-center">
                <button
                  onClick={() => onNavigate('categories')}
                  className="btn btn-primary btn-xl inline-flex items-center gap-3 shadow-medium hover:shadow-lg"
                >
                  <Play className="w-5 h-5" />
                  <span className="font-bold">Comenzar a Jugar</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Secondary Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                <button
                  onClick={() => onNavigate('leaderboard')}
                  className="btn btn-secondary btn-lg flex items-center justify-center gap-3"
                >
                  <Trophy className="w-5 h-5" />
                  <span>Ver Ranking</span>
                </button>

                <button
                  onClick={() => onNavigate('profile')}
                  className="btn btn-ghost btn-lg flex items-center justify-center gap-3"
                >
                  <User className="w-5 h-5" />
                  <span>{playerName ? 'Mi Perfil' : 'Crear Perfil'}</span>
                </button>
              </div>
            </motion.div>

            {/* Stats Preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <div className="stat-card">
                <div className="stat-value text-blue-600">5</div>
                <div className="stat-label">Categorías</div>
              </div>
              <div className="stat-card">
                <div className="stat-value text-emerald-600">25+</div>
                <div className="stat-label">Preguntas</div>
              </div>
              <div className="stat-card">
                <div className="stat-value text-purple-600">∞</div>
                <div className="stat-label">Diversión</div>
              </div>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="mt-20 pt-12 border-t border-slate-200 text-center"
            >
              <p className="text-body-sm mb-2">Desarrollado con ❤️ por</p>
              <p className="font-semibold text-slate-700">César Eduardo González</p>
              <p className="text-body-sm">Analista en Sistemas</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}