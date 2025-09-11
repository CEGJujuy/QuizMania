import React from 'react';
import { motion } from 'framer-motion';
import { Play, Trophy, User, Gamepad2, Sparkles, Zap, Star } from 'lucide-react';

interface MainMenuProps {
  onNavigate: (screen: string) => void;
  playerName: string;
}

export function MainMenu({ onNavigate, playerName }: MainMenuProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Background Shapes */}
      <div className="floating-shapes">
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8"
      >
        <div className="glass-card max-w-2xl w-full text-center p-8 sm:p-12 neon-glow">
          {/* Logo and Title */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
            className="mb-12"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-8xl sm:text-9xl mb-6 inline-block"
              >
                🧠
              </motion.div>
              <motion.div
                className="absolute -top-2 -right-2 text-3xl"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⚡
              </motion.div>
            </div>
            
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-gradient mb-6"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              QuizMania
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-white/90 text-xl sm:text-2xl font-light mb-4"
            >
              ¡Desafía tu mente y conquista el conocimiento!
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-center gap-2 text-yellow-400"
            >
              <Star className="animate-pulse" size={20} />
              <span className="font-semibold">Plataforma de Trivia Interactiva</span>
              <Star className="animate-pulse" size={20} />
            </motion.div>
          </motion.div>

          {/* Welcome Back Message */}
          {playerName && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mb-10 p-6 glass-card pulse-glow"
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Sparkles className="text-yellow-400" size={24} />
                </motion.div>
                <p className="text-white/90 font-semibold text-lg">¡Bienvenido de vuelta!</p>
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                >
                  <Zap className="text-purple-400" size={24} />
                </motion.div>
              </div>
              <p className="font-bold text-2xl text-gradient">{playerName}</p>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="space-y-6"
          >
            <motion.button
              onClick={() => onNavigate('categories')}
              className="btn-special w-full flex items-center justify-center gap-4 text-2xl py-8 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Play size={28} />
              </motion.div>
              <span className="font-black tracking-wider">COMENZAR AVENTURA</span>
              <motion.div
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎯
              </motion.div>
            </motion.button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.button
                onClick={() => onNavigate('leaderboard')}
                className="btn-secondary flex items-center justify-center gap-3 text-lg py-6 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Trophy size={24} />
                </motion.div>
                <span className="font-bold tracking-wide">Ranking</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">🏆</span>
              </motion.button>

              <motion.button
                onClick={() => onNavigate('profile')}
                className="btn-ghost flex items-center justify-center gap-3 text-lg py-6 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <User size={24} />
                </motion.div>
                <span className="font-bold tracking-wide">{playerName ? 'Mi Perfil' : 'Crear Perfil'}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">👤</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Developer Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-12 pt-8 border-t border-white/20"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Gamepad2 size={20} className="text-purple-400" />
              </motion.div>
              <span className="text-white/70 font-medium">Desarrollado con ❤️ por</span>
            </div>
            <p className="font-bold text-lg text-gradient">César Eduardo González</p>
            <p className="text-white/60 font-light">Analista en Sistemas</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}