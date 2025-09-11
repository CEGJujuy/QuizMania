import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Save, ArrowLeft, Trophy, Target, Zap, Calendar, Edit3, Star } from 'lucide-react';
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
    <div className="hero-modern min-h-screen relative">
      {/* Floating Background Elements */}
      <div className="floating-element floating-element-1"></div>
      <div className="floating-element floating-element-2"></div>
      <div className="floating-element floating-element-3"></div>
      
      <div className="hero-background-modern"></div>
      <div className="hero-content-modern">
        <div className="container-fluid section-space">
          {/* Header */}
          <div className="flex items-center justify-between mb-16">
            <button
              onClick={() => onNavigate('menu')}
              className="btn-ghost btn-md flex items-center gap-3"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Volver</span>
            </button>
            
            <div className="text-center flex-1 mx-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl shadow-modern-lg mb-6">
                <User className="w-8 h-8 text-white" />
              </div>
              <h1 className="section-title">
                {player ? 'Mi Perfil' : 'Crear Perfil'}
              </h1>
            </div>
            
            <div className="w-32"></div>
          </div>

          <div className="max-w-3xl mx-auto space-y-12">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="floating-card p-12"
            >
              <div className="text-center mb-12">
                <div className="text-9xl mb-8">{selectedAvatar}</div>
                
                {isEditing ? (
                  <div className="space-y-8">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ingresa tu nombre"
                      className="input-modern text-xl text-center"
                      maxLength={20}
                    />
                    
                    <div>
                      <h3 className="card-title mb-8">Elige tu Avatar</h3>
                      <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-7 gap-4">
                        {avatars.map((avatar, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedAvatar(avatar)}
                            className={`text-4xl p-4 rounded-2xl transition-all duration-300 ${
                              selectedAvatar === avatar
                                ? 'bg-gradient-to-br from-indigo-100 to-purple-100 border-4 border-indigo-400 scale-110 shadow-modern'
                                : 'bg-slate-50 hover:bg-slate-100 hover:scale-105 shadow-md'
                            }`}
                          >
                            {avatar}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-6">
                      <button
                        onClick={handleSave}
                        disabled={!name.trim()}
                        className="btn-primary btn-lg flex-1 flex items-center justify-center gap-3"
                      >
                        <Save className="w-6 h-6" />
                        <span className="font-bold">Guardar Perfil</span>
                      </button>
                      {player && (
                        <button
                          onClick={() => setIsEditing(false)}
                          className="btn-ghost btn-lg flex-1"
                        >
                          Cancelar
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-5xl font-black mb-6 text-gradient-modern">{player?.name}</h2>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="btn-secondary btn-lg flex items-center gap-3"
                    >
                      <Edit3 className="w-6 h-6" />
                      <span className="font-bold">Editar Perfil</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Stats */}
            {player && !isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8"
              >
                <div className="stat-modern">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <div className="stat-value-modern text-amber-600">{player.totalPoints.toLocaleString()}</div>
                  <div className="stat-label-modern">Puntos Totales</div>
                </div>
                
                <div className="stat-modern">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div className="stat-value-modern text-indigo-600">{player.gamesPlayed}</div>
                  <div className="stat-label-modern">Partidas Jugadas</div>
                </div>
                
                <div className="stat-modern">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div className="stat-value-modern text-orange-600">{player.bestStreak}</div>
                  <div className="stat-label-modern">Mejor Racha</div>
                </div>
                
                <div className="stat-modern">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <div className="stat-value-modern text-emerald-600">
                    {Math.floor((Date.now() - player.createdAt.getTime()) / (1000 * 60 * 60 * 24)) + 1}
                  </div>
                  <div className="stat-label-modern">Días Activo</div>
                </div>
              </motion.div>
            )}

            {/* Achievements */}
            {player && !isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="floating-card p-12"
              >
                <h3 className="card-title mb-8 text-center">🏆 Logros Desbloqueados</h3>
                
                {player.achievements.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-8xl mb-8">🎯</div>
                    <p className="body-text mb-12 text-xl">
                      ¡Juega más partidas para desbloquear logros épicos!
                    </p>
                    <button
                      onClick={() => onNavigate('categories')}
                      className="btn-primary btn-lg flex items-center gap-3 mx-auto"
                    >
                      <Star className="w-6 h-6" />
                      <span className="font-bold">Comenzar Aventura</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {player.achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-6 p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl border border-slate-200 shadow-md"
                      >
                        <div className="text-4xl">🏅</div>
                        <span className="text-xl text-slate-700 font-semibold">{achievement}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}