import React from 'react';
import { motion } from 'framer-motion';
import { Play, Trophy, User, Gamepad2 } from 'lucide-react';

interface MainMenuProps {
  onNavigate: (screen: string) => void;
  playerName: string;
}

export function MainMenu({ onNavigate, playerName }: MainMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="game-card max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="text-6xl mb-4">🧠</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent mb-2">
            QuizMania
          </h1>
          <p className="text-white/70">
            ¡Pon a prueba tus conocimientos!
          </p>
        </motion.div>

        {playerName && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-6 p-3 bg-white/10 rounded-lg"
          >
            <p className="text-sm text-white/80">Bienvenido de vuelta,</p>
            <p className="font-bold text-lg">{playerName}</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <button
            onClick={() => onNavigate('categories')}
            className="btn-primary w-full flex items-center justify-center gap-3"
          >
            <Play size={20} />
            Jugar
          </button>

          <button
            onClick={() => onNavigate('leaderboard')}
            className="btn-secondary w-full flex items-center justify-center gap-3"
          >
            <Trophy size={20} />
            Ranking
          </button>

          <button
            onClick={() => onNavigate('profile')}
            className="btn-success w-full flex items-center justify-center gap-3"
          >
            <User size={20} />
            {playerName ? 'Mi Perfil' : 'Crear Perfil'}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-xs text-white/50"
        >
          <div className="flex items-center justify-center gap-1 mb-2">
            <Gamepad2 size={16} />
            <span>Desarrollado por César González</span>
          </div>
          <p>Analista en Sistemas</p>
        </motion.div>
      </div>
    </motion.div>
  );
}