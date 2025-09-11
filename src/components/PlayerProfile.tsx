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
      className="min-h-screen p-4"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => onNavigate('menu')}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Volver al Menú
          </button>
          
          <h1 className="text-2xl font-bold">
            {player ? 'Mi Perfil' : 'Crear Perfil'}
          </h1>
          
          <div></div>
        </div>

        <div className="space-y-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="game-card"
          >
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{selectedAvatar}</div>
              
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ingresa tu nombre"
                    className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                    maxLength={20}
                  />
                  
                  <div>
                    <p className="text-sm text-white/70 mb-3">Elige tu avatar:</p>
                    <div className="grid grid-cols-6 gap-2">
                      {avatars.map((avatar, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedAvatar(avatar)}
                          className={`text-2xl p-2 rounded-lg transition-all ${
                            selectedAvatar === avatar
                              ? 'bg-blue-500/50 border-2 border-blue-400'
                              : 'bg-white/10 hover:bg-white/20'
                          }`}
                        >
                          {avatar}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      disabled={!name.trim()}
                      className="btn-success flex-1 flex items-center justify-center gap-2"
                    >
                      <Save size={16} />
                      Guardar
                    </button>
                    {player && (
                      <button
                        onClick={() => setIsEditing(false)}
                        className="btn-secondary flex-1"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold mb-2">{player?.name}</h2>
                  <p className="text-white/70 mb-4">
                    Miembro desde {player?.createdAt.toLocaleDateString()}
                  </p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-primary flex items-center gap-2"
                  >
                    <User size={16} />
                    Editar Perfil
                  </button>
                </div>
              )}
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