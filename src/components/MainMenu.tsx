import React from 'react';
import { motion } from 'framer-motion';
import { Play, Trophy, User, Gamepad2, Sparkles } from 'lucide-react';

interface MainMenuProps {
  onNavigate: (screen: string) => void;
  playerName: string;
}

export function MainMenu({ onNavigate, playerName }: MainMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8"
    >
      <div className="glass-card max-w-lg w-full text-center p-8 sm:p-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-10"
        >
          <div className="text-7xl sm:text-8xl mb-6 animate-bounce-slow">🧠</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient mb-4">
            QuizMania
          </h1>
          <p className="text-white/80 text-lg sm:text-xl font-light">
            ¡Pon a prueba tus conocimientos!
          </p>
        </motion.div>

        {playerName && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8 p-4 glass-card"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="text-yellow-400" size={20} />
              <p className="text-white/80 font-medium">Bienvenido de vuelta</p>
            </div>
            <p className="font-bold text-xl text-gradient">{playerName}</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-5"
        >
          <button
            onClick={() => onNavigate('categories')}
            className="btn-primary w-full flex items-center justify-center gap-3 text-lg"
          >
            <Play size={24} />
            Jugar
          </button>

          <button
            onClick={() => onNavigate('leaderboard')}
            className="btn-secondary w-full flex items-center justify-center gap-3 text-lg"
          >
            <Trophy size={24} />
            Ranking
          </button>

          <button
            onClick={() => onNavigate('profile')}
            className="btn-ghost w-full flex items-center justify-center gap-3 text-lg"
          >
            <User size={24} />
            {playerName ? 'Mi Perfil' : 'Crear Perfil'}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 text-sm text-white/60"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Gamepad2 size={16} />
            <span>Desarrollado por César González</span>
          </div>
          <p className="font-light">Analista en Sistemas</p>
        </motion.div>
      </div>
    </motion.div>
  );
}