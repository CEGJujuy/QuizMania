import React from 'react';
import { motion } from 'framer-motion';
import { Play, Trophy, User, Sparkles, Star, Award } from 'lucide-react';

interface MainMenuProps {
  onNavigate: (screen: string) => void;
  playerName: string;
}

export function MainMenu({ onNavigate, playerName }: MainMenuProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
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
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-lg mb-6">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-4xl text-white"
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
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <div className="badge badge-primary">
                <Star className="w-4 h-4 mr-2" />
                5 Categorías
              </div>
              <div className="badge badge-success">
                <Award className="w-4 h-4 mr-2" />
                Sistema de Logros
              </div>
              <div className="badge badge-warning">
                <Trophy className="w-4 h-4 mr-2" />
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
                <Sparkles className="w-6 h-6 text-blue-500 mr-3" />
                <h3 className="text-xl font-semibold text-slate-800">¡Bienvenido de vuelta!</h3>
                <Sparkles className="w-6 h-6 text-blue-500 ml-3" />
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
                className="btn-primary btn-large inline-flex items-center gap-4 text-xl font-bold px-12 py-6 rounded-2xl shadow-lg hover:shadow-xl"
              >
                <Play className="w-6 h-6" />
                <span>Comenzar a Jugar</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </button>
            </div>

            {/* Secondary Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <button
                onClick={() => onNavigate('leaderboard')}
                className="btn-secondary btn-large flex items-center justify-center gap-3 group"
              >
                <Trophy className="w-5 h-5 group-hover:text-amber-500 transition-colors" />
                <span>Ver Ranking</span>
              </button>

              <button
                onClick={() => onNavigate('profile')}
                className="btn-ghost btn-large flex items-center justify-center gap-3 group"
              >
                <User className="w-5 h-5 group-hover:text-blue-500 transition-colors" />
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
              <div className="stat-label">Categorías Disponibles</div>
            </div>
            <div className="stat-card">
              <div className="stat-value text-emerald-600">25+</div>
              <div className="stat-label">Preguntas por Categoría</div>
            </div>
            <div className="stat-card">
              <div className="stat-value text-purple-600">∞</div>
              <div className="stat-label">Diversión Garantizada</div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="mt-20 pt-12 border-t border-slate-200 text-center"
          >
            <p className="text-slate-500 mb-2">Desarrollado con ❤️ por</p>
            <p className="font-semibold text-slate-700">César Eduardo González</p>
            <p className="text-sm text-slate-500">Analista en Sistemas</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}