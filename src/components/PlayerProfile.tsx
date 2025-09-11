import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Save, ArrowLeft, Trophy, Target, Zap, Calendar } from 'lucide-react';
import { Player } from '../types';

interface PlayerProfileProps {
  player: Player | null;
  onNavigate: (screen: string) => void;
  onSavePlayer: (player: Player) => void;
}

const avatars = ['👤', '🧑', '👩', '🧔', '👨', '🧑‍💼', '👩‍💼', '🧑‍🎓', '👩‍🎓', '🧑‍💻', '👩‍💻', '🧑‍🎨', '👩‍🎨'];

export function PlayerProfile({ player, onNavigate, onSavePlayer }: PlayerProfileProps) {
  const [name, setName] = useState(player?.name || '');
  const [selectedAvatar, setSelectedAvatar] = useState(player?.avatar || avatars[0]);
  const [isEditing, setIsEditing] = useState(!player);

  const handleSave = () => {
    if (!name.trim()) return;

    const newPlayer: Player = {
      id: player?.id || Date.now().toString(),
      name: name.trim(),
      avatar: selectedAvatar,
      totalPoints: player?.totalPoints || 0,
      gamesPlayed: player?.gamesPlayed || 0,
      bestStreak: player?.bestStreak || 0,
      achievements: player?.achievements || [],
      createdAt: player?.createdAt || new Date()
    };

    onSavePlayer(newPlayer);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen p-4 sm:p-6 lg:p-8"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-12 gap-4">
          <button
            onClick={() => onNavigate('menu')}
            className="btn-ghost flex items-center gap-2 self-start sm:self-center"
          >
            <ArrowLeft size={20} />
            Volver al Menú
          </button>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-gradient">
            {player ? 'Mi Perfil' : 'Crear Perfil'}
          </h1>
          
          <div className="hidden sm:block w-32"></div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 sm:p-10"
          >
            <div className="text-center mb-8">
              <div className="text-7xl sm:text-8xl mb-6">{selectedAvatar}</div>
              
              {isEditing ? (
                <div className="space-y-6">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ingresa tu nombre"
                    className="w-full px-6 py-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 text-lg transition-all duration-300"
                    maxLength={20}
                  />
            className="glass-card p-6 sm:p-8"
                  <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gradient">🏆 Logros</h3>
                    <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-7 gap-3">
                      {avatars.map((avatar, index) => (
              <div className="text-center py-12 text-white/80">
                <div className="text-6xl mb-4">🎯</div>
                <p className="text-lg">¡Juega más partidas para desbloquear logros!</p>
                          className={`text-3xl p-3 rounded-2xl transition-all duration-300 ${
                            selectedAvatar === avatar
              <div className="grid gap-3">
                              : 'bg-white/10 hover:bg-white/20 hover:scale-105'
                          }`}
                        >
                    className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl border border-white/20"
                        </button>
                    <div className="text-3xl">🏅</div>
                    <span className="text-lg">{achievement}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleSave}
                      disabled={!name.trim()}
                      className="btn-success flex-1 flex items-center justify-center gap-2 text-lg"
                    >
                      <Save size={20} />
                      Guardar
                    </button>
                    {player && (
                      <button
                        onClick={() => setIsEditing(false)}
                        className="btn-ghost flex-1 text-lg"
                      >
                        Cancelar
                      </button>
            <div className="stat-card">
              <Target className="text-blue-400 mx-auto mb-3" size={28} />
              <div className="text-xl sm:text-2xl font-bold mb-1">{player.gamesPlayed}</div>
              <div className="text-sm text-white/80 font-medium">Partidas Jugadas</div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-gradient">{player?.name}</h2>
            <div className="stat-card">
              <Zap className="text-orange-400 mx-auto mb-3" size={28} />
              <div className="text-xl sm:text-2xl font-bold mb-1">{player.bestStreak}</div>
              <div className="text-sm text-white/80 font-medium">Mejor Racha</div>
                    onClick={() => setIsEditing(true)}
                    className="btn-primary flex items-center gap-2 text-lg"
            <div className="stat-card">
              <Calendar className="text-green-400 mx-auto mb-3" size={28} />
              <div className="text-xl sm:text-2xl font-bold mb-1">
              <Trophy className="text-yellow-400 mx-auto mb-3" size={28} />
              <div className="text-xl sm:text-2xl font-bold mb-1">{player.totalPoints.toLocaleString()}</div>
              <div className="text-sm text-white/80 font-medium">Días Activo</div>
            </div>
          </motion.div>

          {/* Stats */}
          {player && !isEditing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div className="game-card text-center">
                <Trophy className="text-yellow-400 mx-auto mb-2" size={24} />
                <div className="text-xl font-bold">{player.totalPoints.toLocaleString()}</div>
                <div className="text-xs text-white/70">Puntos Totales</div>
              </div>
              
              <div className="game-card text-center">
                <Target className="text-blue-400 mx-auto mb-2" size={24} />
                <div className="text-xl font-bold">{player.gamesPlayed}</div>
                <div className="text-xs text-white/70">Partidas Jugadas</div>
              </div>
              
              <div className="game-card text-center">
                <Zap className="text-orange-400 mx-auto mb-2" size={24} />
                <div className="text-xl font-bold">{player.bestStreak}</div>
                <div className="text-xs text-white/70">Mejor Racha</div>
              </div>
              
              <div className="game-card text-center">
                <Calendar className="text-green-400 mx-auto mb-2" size={24} />
                <div className="text-xl font-bold">
                  {Math.floor((Date.now() - player.createdAt.getTime()) / (1000 * 60 * 60 * 24)) + 1}
                </div>
                <div className="text-xs text-white/70">Días Activo</div>
              </div>
            </motion.div>
          )}

          {/* Achievements */}
          {player && !isEditing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="game-card"
            >
              <h3 className="text-lg font-bold mb-4">🏆 Logros</h3>
              
              {player.achievements.length === 0 ? (
                <div className="text-center py-8 text-white/70">
                  <div className="text-4xl mb-2">🎯</div>
                  <p>¡Juega más partidas para desbloquear logros!</p>
                </div>
              ) : (
                <div className="grid gap-2">
                  {player.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-white/10 rounded-lg"
                    >
                      <div className="text-2xl">🏅</div>
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}