export interface QuizQuestion {
  id: string;
  question: string;
  questionLatex?: string;
  answer: string;
  answerLatex?: string;
  acceptableAnswers?: string[];
  hint?: string;
  explanation?: string;
  explanationLatex?: string;
}

export interface Topic {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  description: string;
  lessons: LessonSection[];
  quiz: QuizQuestion[];
}

export interface LessonSection {
  title: string;
  content: string;
}

export interface QuizAttempt {
  topicId: string;
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
  timestamp: number;
}

export interface TopicProgress {
  topicId: string;
  attempts: QuizAttempt[];
  bestScore: number;
  totalAttempts: number;
  lastAttemptDate: number;
}

export interface UserProgress {
  topics: Record<string, TopicProgress>;
  examAttempts: ExamAttempt[];
}

export interface ExamAttempt {
  id: string;
  answers: Record<string, { userAnswer: string; isCorrect: boolean }>;
  score: number;
  totalQuestions: number;
  timestamp: number;
}

export interface MathSymbol {
  symbol: string;
  latex: string;
  label: string;
  category: 'greek' | 'operators' | 'relations' | 'calculus' | 'common' | 'numbers';
}
