'use client';

import { useState, useEffect } from 'react';
import { QuizQuestion } from '@/lib/types';
import { Math as MathDisplay, MathBlock } from './Math';
import { MathInput } from './MathInput';
import { recordQuizAttempt, updateTopicBestScore, getQuestionAttempts } from '@/lib/storage';

interface QuizProps {
  questions: QuizQuestion[];
  topicId: string;
  onComplete?: (score: number, total: number) => void;
}

interface QuestionState {
  answer: string;
  submitted: boolean;
  isCorrect: boolean | null;
  attempts: number;
}

export function Quiz({ questions, topicId, onComplete }: QuizProps) {
  const [questionStates, setQuestionStates] = useState<Record<string, QuestionState>>({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Initialize states
    const initial: Record<string, QuestionState> = {};
    questions.forEach(q => {
      const prevAttempts = getQuestionAttempts(topicId, q.id);
      initial[q.id] = {
        answer: '',
        submitted: false,
        isCorrect: null,
        attempts: prevAttempts.length,
      };
    });
    setQuestionStates(initial);
  }, [questions, topicId]);

  const normalizeAnswer = (answer: string): string => {
    return answer
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '')
      .replace(/\*/g, '')
      .replace(/×/g, '')
      .replace(/·/g, '');
  };

  const checkAnswer = (questionId: string, userAnswer: string, correctAnswer: string, acceptableAnswers?: string[]): boolean => {
    const normalized = normalizeAnswer(userAnswer);
    const normalizedCorrect = normalizeAnswer(correctAnswer);

    if (normalized === normalizedCorrect) return true;

    if (acceptableAnswers) {
      return acceptableAnswers.some(acc => normalizeAnswer(acc) === normalized);
    }

    return false;
  };

  const handleSubmit = (question: QuizQuestion) => {
    const state = questionStates[question.id];
    if (!state || state.submitted) return;

    const isCorrect = checkAnswer(
      question.id,
      state.answer,
      question.answer,
      question.acceptableAnswers
    );

    // Record the attempt
    recordQuizAttempt(topicId, question.id, state.answer, isCorrect);

    setQuestionStates(prev => ({
      ...prev,
      [question.id]: {
        ...prev[question.id],
        submitted: true,
        isCorrect,
        attempts: prev[question.id].attempts + 1,
      },
    }));
  };

  const handleRetry = (questionId: string) => {
    setQuestionStates(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        answer: '',
        submitted: false,
        isCorrect: null,
      },
    }));
  };

  const handleShowResults = () => {
    const correct = Object.values(questionStates).filter(s => s.isCorrect).length;
    const total = questions.length;
    const scorePercent = Math.round((correct / total) * 100);

    updateTopicBestScore(topicId, scorePercent);
    setShowResults(true);

    if (onComplete) {
      onComplete(correct, total);
    }
  };

  const allSubmitted = Object.values(questionStates).every(s => s.submitted);
  const correctCount = Object.values(questionStates).filter(s => s.isCorrect).length;

  if (showResults) {
    return (
      <div className="bg-white rounded-xl border p-8 text-center">
        <div className="mb-6">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
            correctCount === questions.length ? 'bg-green-100' : correctCount >= questions.length / 2 ? 'bg-yellow-100' : 'bg-red-100'
          }`}>
            <span className="text-3xl font-bold">
              {correctCount}/{questions.length}
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-2">
            {correctCount === questions.length
              ? 'Perfect Score!'
              : correctCount >= questions.length / 2
              ? 'Good Job!'
              : 'Keep Practicing!'}
          </h3>
          <p className="text-gray-600">
            You got {correctCount} out of {questions.length} questions correct
          </p>
        </div>

        <button
          onClick={() => {
            setShowResults(false);
            const initial: Record<string, QuestionState> = {};
            questions.forEach(q => {
              const prevAttempts = getQuestionAttempts(topicId, q.id);
              initial[q.id] = {
                answer: '',
                submitted: false,
                isCorrect: null,
                attempts: prevAttempts.length,
              };
            });
            setQuestionStates(initial);
          }}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Quiz</h2>
        <span className="text-sm text-gray-500">
          {Object.values(questionStates).filter(s => s.submitted).length} / {questions.length} answered
        </span>
      </div>

      {questions.map((question, index) => {
        const state = questionStates[question.id] || { answer: '', submitted: false, isCorrect: null, attempts: 0 };

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
              <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold text-sm">
                {index + 1}
              </span>
              <div className="flex-1">
                <p className="font-medium text-gray-900 mb-2">{question.question}</p>
                {question.questionLatex && (
                  <MathBlock>{question.questionLatex}</MathBlock>
                )}
              </div>
            </div>

            {state.attempts > 0 && !state.submitted && (
              <p className="text-sm text-gray-500 mb-2 ml-12">
                Previous attempts: {state.attempts}
              </p>
            )}

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
                    onClick={() => handleSubmit(question)}
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

              {/* Feedback section */}
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
                        {question.answerLatex && (
                          <span className="ml-2">
                            <MathDisplay>{question.answerLatex}</MathDisplay>
                          </span>
                        )}
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

      {allSubmitted && (
        <div className="text-center pt-4">
          <button
            onClick={handleShowResults}
            className="px-8 py-4 bg-green-600 text-white rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg"
          >
            View Results
          </button>
        </div>
      )}
    </div>
  );
}
