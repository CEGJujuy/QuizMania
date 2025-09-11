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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container-custom section-padding">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
          <button
            onClick={() => onNavigate('menu')}
            className="btn-ghost flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al Menú
          </button>
          
          <h1 className="heading-secondary">
            <span className="text-gradient">{player ? 'Mi Perfil' : 'Crear Perfil'}</span>
          </h1>
          
          <div className="hidden sm:block w-32"></div>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-elevated p-10"
          >
            <div className="text-center mb-8">
              <div className="text-8xl mb-6">{selectedAvatar}</div>
              
              {isEditing ? (
                <div className="space-y-6">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ingresa tu nombre"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 text-lg transition-all duration-300"
                    maxLength={20}
                  />
                  
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-slate-800">Elige tu Avatar</h3>
                    <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-7 gap-3">
                      {avatars.map((avatar, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedAvatar(avatar)}
                          className={`text-3xl p-3 rounded-xl transition-all duration-300 ${
                            selectedAvatar === avatar
                              ? 'bg-blue-100 border-2 border-blue-400 scale-110'
                              : 'bg-slate-50 hover:bg-slate-100 hover:scale-105'
                          }`}
                        >
                          {avatar}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleSave}
                      disabled={!name.trim()}
                      className="btn-primary flex-1 flex items-center justify-center gap-3 btn-large"
                    >
                      <Save className="w-5 h-5" />
                      <span>Guardar Perfil</span>
                    </button>
                    {player && (
                      <button
                        onClick={() => setIsEditing(false)}
                        className="btn-ghost flex-1 btn-large"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-4xl font-bold mb-4 text-slate-800">{player?.name}</h2>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-secondary flex items-center gap-3 btn-large"
                  >
                    <User className="w-5 h-5" />
                    <span>Editar Perfil</span>
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
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              <div className="stat-card">
                <Trophy className="text-amber-500 mx-auto mb-3" size={28} />
                <div className="stat-value text-amber-600">{player.totalPoints.toLocaleString()}</div>
                <div className="stat-label">Puntos Totales</div>
              </div>
              
              <div className="stat-card">
                <Target className="text-blue-500 mx-auto mb-3" size={28} />
                <div className="stat-value text-blue-600">{player.gamesPlayed}</div>
                <div className="stat-label">Partidas Jugadas</div>
              </div>
              
              <div className="stat-card">
                <Zap className="text-orange-500 mx-auto mb-3" size={28} />
                <div className="stat-value text-orange-600">{player.bestStreak}</div>
                <div className="stat-label">Mejor Racha</div>
              </div>
              
              <div className="stat-card">
                <Calendar className="text-emerald-500 mx-auto mb-3" size={28} />
                <div className="stat-value text-emerald-600">
                  {Math.floor((Date.now() - player.createdAt.getTime()) / (1000 * 60 * 60 * 24)) + 1}
                </div>
                <div className="stat-label">Días Activo</div>
              </div>
            </motion.div>
          )}

          {/* Achievements */}
          {player && !isEditing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card-elevated p-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-slate-800">🏆 Logros</h3>
              
              {player.achievements.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎯</div>
                  <p className="text-body mb-8">
                    ¡Juega más partidas para desbloquear logros!
                  </p>
                  <button
                    onClick={() => onNavigate('categories')}
                    className="btn-primary flex items-center gap-2 mx-auto"
                  >
                    <span>Comenzar a Jugar</span>
                  </button>
                </div>
              ) : (
                <div className="grid gap-3">
                  {player.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200"
                    >
                      <div className="text-3xl">🏅</div>
                      <span className="text-lg text-slate-700">{achievement}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}