import { UserProgress, TopicProgress, QuizAttempt, ExamAttempt } from './types';

const STORAGE_KEY = 'calculus-trainer-progress';

export function getProgress(): UserProgress {
  if (typeof window === 'undefined') {
    return { topics: {}, examAttempts: [] };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load progress:', e);
  }

  return { topics: {}, examAttempts: [] };
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

export function recordQuizAttempt(
  topicId: string,
  questionId: string,
  userAnswer: string,
  isCorrect: boolean
): void {
  const progress = getProgress();

  if (!progress.topics[topicId]) {
    progress.topics[topicId] = {
      topicId,
      attempts: [],
      bestScore: 0,
      totalAttempts: 0,
      lastAttemptDate: Date.now(),
    };
  }

  const attempt: QuizAttempt = {
    topicId,
    questionId,
    userAnswer,
    isCorrect,
    timestamp: Date.now(),
  };

  progress.topics[topicId].attempts.push(attempt);
  progress.topics[topicId].lastAttemptDate = Date.now();
  progress.topics[topicId].totalAttempts++;

  saveProgress(progress);
}

export function updateTopicBestScore(topicId: string, score: number): void {
  const progress = getProgress();

  if (!progress.topics[topicId]) {
    progress.topics[topicId] = {
      topicId,
      attempts: [],
      bestScore: score,
      totalAttempts: 0,
      lastAttemptDate: Date.now(),
    };
  } else if (score > progress.topics[topicId].bestScore) {
    progress.topics[topicId].bestScore = score;
  }

  saveProgress(progress);
}

export function getTopicProgress(topicId: string): TopicProgress | null {
  const progress = getProgress();
  return progress.topics[topicId] || null;
}

export function recordExamAttempt(
  answers: Record<string, { userAnswer: string; isCorrect: boolean }>,
  score: number,
  totalQuestions: number
): void {
  const progress = getProgress();

  const examAttempt: ExamAttempt = {
    id: `exam-${Date.now()}`,
    answers,
    score,
    totalQuestions,
    timestamp: Date.now(),
  };

  progress.examAttempts.push(examAttempt);
  saveProgress(progress);
}

export function getExamAttempts(): ExamAttempt[] {
  return getProgress().examAttempts;
}

export function getAllTopicsProgress(): Record<string, TopicProgress> {
  return getProgress().topics;
}

export function clearAllProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function getTopicAttemptHistory(topicId: string): QuizAttempt[] {
  const progress = getProgress();
  return progress.topics[topicId]?.attempts || [];
}

export function getQuestionAttempts(topicId: string, questionId: string): QuizAttempt[] {
  const attempts = getTopicAttemptHistory(topicId);
  return attempts.filter(a => a.questionId === questionId);
}

export function calculateTopicAccuracy(topicId: string): number {
  const attempts = getTopicAttemptHistory(topicId);
  if (attempts.length === 0) return 0;

  const correct = attempts.filter(a => a.isCorrect).length;
  return Math.round((correct / attempts.length) * 100);
}

export function getRecentAttempts(limit: number = 10): QuizAttempt[] {
  const progress = getProgress();
  const allAttempts: QuizAttempt[] = [];

  Object.values(progress.topics).forEach(topic => {
    allAttempts.push(...topic.attempts);
  });

  return allAttempts
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit);
}
