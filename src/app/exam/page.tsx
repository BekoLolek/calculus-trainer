'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { MathInput } from '@/components/MathInput';
import { Math as MathDisplay, MathBlock } from '@/components/Math';
import { examQuestions } from '@/lib/examQuestions';
import { recordExamAttempt, getExamAttempts } from '@/lib/storage';
import { ExamAttempt } from '@/lib/types';

interface QuestionState {
  answer: string;
  submitted: boolean;
  isCorrect: boolean | null;
}

export default function ExamPage() {
  const [started, setStarted] = useState(false);
  const [questionStates, setQuestionStates] = useState<Record<string, QuestionState>>({});
  const [showResults, setShowResults] = useState(false);
  const [previousAttempts, setPreviousAttempts] = useState<ExamAttempt[]>([]);

  useEffect(() => {
    setPreviousAttempts(getExamAttempts());
  }, []);

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

  const handleSubmit = (questionId: string) => {
    const question = examQuestions.find(q => q.id === questionId);
    const state = questionStates[questionId];
    if (!question || !state || state.submitted) return;

    const isCorrect = checkAnswer(state.answer, question.answer, question.acceptableAnswers);

    setQuestionStates(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        submitted: true,
        isCorrect,
      },
    }));
  };

  const handleFinishExam = () => {
    const answers: Record<string, { userAnswer: string; isCorrect: boolean }> = {};
    let score = 0;

    examQuestions.forEach(q => {
      const state = questionStates[q.id];
      if (state) {
        answers[q.id] = {
          userAnswer: state.answer,
          isCorrect: state.isCorrect ?? false,
        };
        if (state.isCorrect) score++;
      }
    });

    recordExamAttempt(answers, score, examQuestions.length);
    setShowResults(true);
    setPreviousAttempts(getExamAttempts());
  };

  const handleRetry = (questionId: string) => {
    setQuestionStates(prev => ({
      ...prev,
      [questionId]: {
        answer: '',
        submitted: false,
        isCorrect: null,
      },
    }));
  };

  const startExam = () => {
    const initial: Record<string, QuestionState> = {};
    examQuestions.forEach(q => {
      initial[q.id] = { answer: '', submitted: false, isCorrect: null };
    });
    setQuestionStates(initial);
    setStarted(true);
    setShowResults(false);
  };

  const allSubmitted = Object.values(questionStates).every(s => s.submitted);
  const correctCount = Object.values(questionStates).filter(s => s.isCorrect).length;

  // Start screen
  if (!started) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-3xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Final Exam</h1>
            <p className="text-lg text-gray-600 mb-2">CAL1 2025 Comprehensive Assessment</p>
            <p className="text-gray-500 mb-8">
              {examQuestions.length} questions based on the actual course exam material
            </p>

            <button
              onClick={startExam}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              Start Exam
            </button>
          </div>

          {/* Previous attempts */}
          {previousAttempts.length > 0 && (
            <div className="bg-white rounded-xl border p-6">
              <h2 className="font-semibold text-lg mb-4">Previous Attempts</h2>
              <div className="space-y-3">
                {previousAttempts.slice(-5).reverse().map((attempt, idx) => (
                  <div key={attempt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium">
                        {attempt.score}/{attempt.totalQuestions} correct
                      </span>
                      <span className="text-gray-500 text-sm ml-2">
                        ({Math.round((attempt.score / attempt.totalQuestions) * 100)}%)
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(attempt.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  // Results screen
  if (showResults) {
    const percentage = Math.round((correctCount / examQuestions.length) * 100);

    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-3xl mx-auto px-4 py-16">
          <div className="bg-white rounded-xl border p-8 text-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
              percentage >= 70 ? 'bg-green-100' : percentage >= 50 ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              <span className={`text-3xl font-bold ${
                percentage >= 70 ? 'text-green-600' : percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {percentage}%
              </span>
            </div>

            <h2 className="text-2xl font-bold mb-2">
              {percentage >= 70 ? 'Excellent Work!' : percentage >= 50 ? 'Good Effort!' : 'Keep Practicing!'}
            </h2>
            <p className="text-gray-600 mb-6">
              You got {correctCount} out of {examQuestions.length} questions correct
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={startExam}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
              <Link
                href="/"
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Back to Topics
              </Link>
            </div>
          </div>

          {/* Review answers */}
          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-4">Review Your Answers</h3>
            <div className="space-y-4">
              {examQuestions.map((question, idx) => {
                const state = questionStates[question.id];
                return (
                  <div
                    key={question.id}
                    className={`bg-white rounded-xl border p-4 ${
                      state?.isCorrect ? 'border-green-300' : 'border-red-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                        state?.isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{question.question.split(':')[0]}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Your answer: <span className="font-mono">{state?.answer || '(none)'}</span>
                        </p>
                        {!state?.isCorrect && (
                          <p className="text-sm text-green-600 mt-1">
                            Correct: <span className="font-mono">{question.answer}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Exam in progress
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Final Exam</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              {Object.values(questionStates).filter(s => s.submitted).length} / {examQuestions.length} answered
            </span>
            {allSubmitted && (
              <button
                onClick={handleFinishExam}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Finish Exam
              </button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {examQuestions.map((question, index) => {
            const state = questionStates[question.id] || { answer: '', submitted: false, isCorrect: null };

            return (
              <div
                key={question.id}
                className={`bg-white rounded-xl border p-6 transition-all ${
                  state.submitted
                    ? state.isCorrect
                      ? 'border-green-300 bg-green-50/50'
                      : 'border-red-300 bg-red-50/50'
                    : ''
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                    state.submitted
                      ? state.isCorrect
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-2">{question.question}</p>
                    {question.questionLatex && (
                      <MathBlock>{question.questionLatex}</MathBlock>
                    )}
                  </div>
                </div>

                <div className="ml-12">
                  <div className="flex gap-3 items-start">
                    <div className="flex-1">
                      <MathInput
                        value={state.answer}
                        onChange={(value) => {
                          setQuestionStates(prev => ({
                            ...prev,
                            [question.id]: { ...prev[question.id], answer: value },
                          }));
                        }}
                        disabled={state.submitted}
                        showFeedback={state.submitted ? (state.isCorrect ? 'correct' : 'incorrect') : null}
                        placeholder="Type your answer..."
                      />
                    </div>
                    {!state.submitted ? (
                      <button
                        onClick={() => handleSubmit(question.id)}
                        disabled={!state.answer.trim()}
                        className="px-5 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRetry(question.id)}
                        className="px-5 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                      >
                        Retry
                      </button>
                    )}
                  </div>

                  {state.submitted && (
                    <div className={`mt-4 p-4 rounded-lg ${state.isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                      {state.isCorrect ? (
                        <p className="text-green-800 font-medium flex items-center gap-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Correct!
                        </p>
                      ) : (
                        <div>
                          <p className="text-red-800 font-medium flex items-center gap-2 mb-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            Incorrect
                          </p>
                          <p className="text-red-700 text-sm">
                            Correct answer: <strong className="font-mono">{question.answer}</strong>
                          </p>
                        </div>
                      )}
                      {question.explanation && (
                        <p className="text-gray-700 text-sm mt-2">{question.explanation}</p>
                      )}
                    </div>
                  )}

                  {question.hint && !state.submitted && (
                    <details className="mt-3">
                      <summary className="text-sm text-blue-600 cursor-pointer hover:text-blue-700">
                        Show hint
                      </summary>
                      <p className="mt-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                        {question.hint}
                      </p>
                    </details>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {allSubmitted && (
          <div className="mt-8 text-center">
            <button
              onClick={handleFinishExam}
              className="px-8 py-4 bg-green-600 text-white rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              Finish Exam & See Results
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
