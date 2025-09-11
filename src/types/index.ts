export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  points: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  unlocked: boolean;
  requiredPoints: number;
  description: string;
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
  totalPoints: number;
  gamesPlayed: number;
  bestStreak: number;
  achievements: string[];
  createdAt: Date;
}

export interface GameSession {
  categoryId: string;
  currentQuestionIndex: number;
  score: number;
  lives: number;
  streak: number;
  timeRemaining: number;
  answers: (number | null)[];
  startTime: Date;
  isComplete: boolean;
}

export interface LeaderboardEntry {
  playerId: string;
  playerName: string;
  score: number;
  category: string;
  date: Date;
  streak: number;
}

export type GameScreen = 'menu' | 'categories' | 'game' | 'leaderboard' | 'profile' | 'complete';