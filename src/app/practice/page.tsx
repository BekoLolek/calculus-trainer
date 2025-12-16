'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { MathInput } from '@/components/MathInput';
import { MathBlock } from '@/components/Math';
import { generatePracticeQuestion, practiceCategories, PracticeQuestion } from '@/lib/practiceQuestions';

export default function PracticePage() {
  const [selectedCategory, setSelectedCategory] = useState('All Topics');
  const [currentQuestion, setCurrentQuestion] = useState<PracticeQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [stats, setStats] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);

  const normalizeAnswer = (answer: string): string => {
    return answer
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '')
      .replace(/\*/g, '')
      .replace(/×/g, '')
      .replace(/·/g, '');
  };

  const checkAnswer = (userAnswer: string, correctAnswer: string, acceptableAnswers?: string[]): boolean => {
    const normalized = normalizeAnswer(userAnswer);
    const normalizedCorrect = normalizeAnswer(correctAnswer);

    if (normalized === normalizedCorrect) return true;

    if (acceptableAnswers) {
      return acceptableAnswers.some(acc => normalizeAnswer(acc) === normalized);
    }

    return false;
  };

  const loadNewQuestion = () => {
    let question: PracticeQuestion;

    if (selectedCategory === 'All Topics') {
      question = generatePracticeQuestion();
    } else {
      // Filter by generating until we get the right category
      // (since generators are random, we just regenerate)
      let attempts = 0;
      do {
        question = generatePracticeQuestion();
        attempts++;
      } while (!question.category.toLowerCase().includes(selectedCategory.toLowerCase()) && attempts < 50);

      // Fallback if we can't find the category
      if (!question.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
        question = generatePracticeQuestion();
      }
    }

    setCurrentQuestion(question);
    setUserAnswer('');
    setSubmitted(false);
    setIsCorrect(null);
  };

  useEffect(() => {
    loadNewQuestion();
  }, [selectedCategory]);

  const handleSubmit = () => {
    if (!currentQuestion || submitted) return;

    const correct = checkAnswer(userAnswer, currentQuestion.answer, currentQuestion.acceptableAnswers);
    setIsCorrect(correct);
    setSubmitted(true);
    setStats(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }));
    setStreak(prev => correct ? prev + 1 : 0);
  };

  const handleNextQuestion = () => {
    loadNewQuestion();
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setStats({ correct: 0, total: 0 });
    setStreak(0);
  };

  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Practice Mode</h1>
          <p className="text-gray-600">Unlimited questions to sharpen your skills</p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-xs text-gray-500">Questions</div>
          </div>
          <div className="bg-white rounded-xl border p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
            <div className="text-xs text-gray-500">Accuracy</div>
          </div>
          <div className="bg-white rounded-xl border p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{streak}</div>
            <div className="text-xs text-gray-500">Streak</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <div className="flex flex-wrap gap-2">
            {practiceCategories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Question Card */}
        {currentQuestion && (
          <div className={`bg-white rounded-xl border p-6 transition-all ${
            submitted
              ? isCorrect
                ? 'border-green-300 bg-green-50/50'
                : 'border-red-300 bg-red-50/50'
              : ''
          }`}>
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                {currentQuestion.category}
              </span>
            </div>

            {/* Question */}
            <div className="mb-6">
              <p className="font-medium text-gray-900 mb-3">{currentQuestion.question}</p>
              {currentQuestion.questionLatex && (
                <MathBlock>{currentQuestion.questionLatex}</MathBlock>
              )}
            </div>

            {/* Answer Input */}
            <div className="mb-4">
              <div className="flex gap-3 items-start">
                <div className="flex-1">
                  <MathInput
                    value={userAnswer}
                    onChange={setUserAnswer}
                    disabled={submitted}
                    showFeedback={submitted ? (isCorrect ? 'correct' : 'incorrect') : null}
                    placeholder="Type your answer..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !submitted && userAnswer.trim()) {
                        handleSubmit();
                      }
                    }}
                  />
                </div>
                {!submitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!userAnswer.trim()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>

            {/* Feedback */}
            {submitted && (
              <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                {isCorrect ? (
                  <p className="text-green-800 font-medium flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Correct! {streak > 1 && <span className="text-green-600">({streak} in a row!)</span>}
                  </p>
                ) : (
                  <div>
                    <p className="text-red-800 font-medium flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      Incorrect
                    </p>
                    <p className="text-red-700 text-sm mb-2">
                      Correct answer: <strong className="font-mono">{currentQuestion.answer}</strong>
                      {currentQuestion.answerLatex && (
                        <span className="ml-2 inline-block">
                          <MathBlock>{currentQuestion.answerLatex}</MathBlock>
                        </span>
                      )}
                    </p>
                  </div>
                )}
                {currentQuestion.explanation && (
                  <p className="text-gray-700 text-sm mt-3 pt-3 border-t border-gray-200">
                    <strong>Explanation:</strong> {currentQuestion.explanation}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Keyboard Shortcut Hint */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Press <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-600">Enter</kbd> to submit
        </p>
      </main>
    </div>
  );
}
