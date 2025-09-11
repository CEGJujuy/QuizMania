import { useState, useEffect, useCallback } from 'react';
import { GameSession, Question, LeaderboardEntry, Player } from '../types';
import { questions } from '../data/questions';

export function useGameLogic(
  categoryId: string,
  player: Player | null,
  onGameComplete: (session: GameSession) => void,
  updateLeaderboard: (entry: LeaderboardEntry) => void,
  updatePlayer: (player: Player) => void
) {
  const [session, setSession] = useState<GameSession>({
    categoryId,
    currentQuestionIndex: 0,
    score: 0,
    lives: 3,
    streak: 0,
    timeRemaining: 30,
    answers: [],
    startTime: new Date(),
    isComplete: false
  });

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const categoryQuestions = questions.filter(q => q.category === categoryId).slice(0, 5);

  useEffect(() => {
    if (categoryQuestions.length > 0 && session.currentQuestionIndex < categoryQuestions.length) {
      setCurrentQuestion(categoryQuestions[session.currentQuestionIndex]);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsAnswered(false);
      setSession(prev => ({ ...prev, timeRemaining: 30 }));
    }
  }, [session.currentQuestionIndex, categoryId]);

  // Timer
  useEffect(() => {
    if (session.timeRemaining > 0 && !isAnswered && !session.isComplete) {
      const timer = setTimeout(() => {
        setSession(prev => ({ ...prev, timeRemaining: prev.timeRemaining - 1 }));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (session.timeRemaining === 0 && !isAnswered) {
      handleTimeUp();
    }
  }, [session.timeRemaining, isAnswered, session.isComplete]);

  const handleTimeUp = useCallback(() => {
    setIsAnswered(true);
    setShowResult(true);
    setSession(prev => ({
      ...prev,
      lives: prev.lives - 1,
      streak: 0,
      answers: [...prev.answers, null]
    }));

    setTimeout(() => {
      if (session.lives - 1 <= 0 || session.currentQuestionIndex >= 4) {
        completeGame();
      } else {
        nextQuestion();
      }
    }, 2000);
  }, [session.lives, session.currentQuestionIndex]);

  const handleAnswer = useCallback((answerIndex: number) => {
    if (isAnswered || !currentQuestion) return;

    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setShowResult(true);

    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const timeBonus = Math.floor(session.timeRemaining / 5);
    const streakBonus = session.streak * 5;
    const questionPoints = isCorrect ? currentQuestion.points + timeBonus + streakBonus : 0;

    setSession(prev => ({
      ...prev,
      score: prev.score + questionPoints,
      lives: isCorrect ? prev.lives : prev.lives - 1,
      streak: isCorrect ? prev.streak + 1 : 0,
      answers: [...prev.answers, answerIndex]
    }));

    setTimeout(() => {
      if (!isCorrect && session.lives - 1 <= 0) {
        completeGame();
      } else if (session.currentQuestionIndex >= 4) {
        completeGame();
      } else {
        nextQuestion();
      }
    }, 2000);
  }, [isAnswered, currentQuestion, session.timeRemaining, session.streak, session.lives, session.currentQuestionIndex]);

  const nextQuestion = useCallback(() => {
    setSession(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1
    }));
  }, []);

  const completeGame = useCallback(() => {
    const finalSession = {
      ...session,
      isComplete: true
    };

    setSession(finalSession);

    // Update leaderboard
    if (player && finalSession.score > 0) {
      const leaderboardEntry: LeaderboardEntry = {
        playerId: player.id,
        playerName: player.name,
        score: finalSession.score,
        category: categoryId,
        date: new Date(),
        streak: finalSession.streak
      };
      updateLeaderboard(leaderboardEntry);

      // Update player stats
      const updatedPlayer: Player = {
        ...player,
        totalPoints: player.totalPoints + finalSession.score,
        gamesPlayed: player.gamesPlayed + 1,
        bestStreak: Math.max(player.bestStreak, finalSession.streak)
      };
      updatePlayer(updatedPlayer);
    }

    onGameComplete(finalSession);
  }, [session, player, categoryId, onGameComplete, updateLeaderboard, updatePlayer]);

  return {
    session,
    currentQuestion,
    selectedAnswer,
    showResult,
    isAnswered,
    handleAnswer,
    categoryQuestions
  };
}