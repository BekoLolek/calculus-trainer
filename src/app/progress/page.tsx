'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { ProgressCard } from '@/components/ProgressCard';
import { topics } from '@/lib/topics';
import {
  getAllTopicsProgress,
  getExamAttempts,
  getRecentAttempts,
  clearAllProgress,
} from '@/lib/storage';
import { TopicProgress, ExamAttempt, QuizAttempt } from '@/lib/types';

export default function ProgressPage() {
  const [topicsProgress, setTopicsProgress] = useState<Record<string, TopicProgress>>({});
  const [examAttempts, setExamAttempts] = useState<ExamAttempt[]>([]);
  const [recentAttempts, setRecentAttempts] = useState<QuizAttempt[]>([]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    setTopicsProgress(getAllTopicsProgress());
    setExamAttempts(getExamAttempts());
    setRecentAttempts(getRecentAttempts(20));
  }, []);

  const handleClearProgress = () => {
    clearAllProgress();
    setTopicsProgress({});
    setExamAttempts([]);
    setRecentAttempts([]);
    setShowClearConfirm(false);
  };

  // Calculate overall stats
  const totalAttempts = Object.values(topicsProgress).reduce((sum, p) => sum + p.totalAttempts, 0);
  const masteredTopics = Object.values(topicsProgress).filter(p => p.bestScore >= 80).length;
  const averageScore = Object.values(topicsProgress).length > 0
    ? Math.round(Object.values(topicsProgress).reduce((sum, p) => sum + p.bestScore, 0) / Object.values(topicsProgress).length)
    : 0;

  const getTopicTitle = (topicId: string) => {
    return topics.find(t => t.id === topicId)?.shortTitle || topicId;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Progress</h1>
          <button
            onClick={() => setShowClearConfirm(true)}
            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Clear All Progress
          </button>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{totalAttempts}</div>
            <div className="text-sm text-gray-500">Total Attempts</div>
          </div>
          <div className="bg-white rounded-xl border p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">{masteredTopics}/11</div>
            <div className="text-sm text-gray-500">Topics Mastered</div>
          </div>
          <div className="bg-white rounded-xl border p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">{averageScore}%</div>
            <div className="text-sm text-gray-500">Average Score</div>
          </div>
          <div className="bg-white rounded-xl border p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">{examAttempts.length}</div>
            <div className="text-sm text-gray-500">Exam Attempts</div>
          </div>
        </div>

        {/* Topics Progress Grid */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">Topic Progress</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {topics.map(topic => (
            <Link key={topic.id} href={`/topic/${topic.id}`}>
              <ProgressCard
                topicId={topic.id}
                topicTitle={`${topic.number}. ${topic.shortTitle}`}
                progress={topicsProgress[topic.id] || null}
              />
            </Link>
          ))}
        </div>

        {/* Exam History */}
        {examAttempts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Exam History</h2>
            <div className="bg-white rounded-xl border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Date</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Score</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Percentage</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {examAttempts.slice().reverse().map((attempt, idx) => {
                    const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
                    return (
                      <tr key={attempt.id} className="border-b last:border-0">
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {new Date(attempt.timestamp).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {attempt.score}/{attempt.totalQuestions}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {percentage}%
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            percentage >= 70
                              ? 'bg-green-100 text-green-700'
                              : percentage >= 50
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {percentage >= 70 ? 'Pass' : percentage >= 50 ? 'Close' : 'Needs Work'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        {recentAttempts.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="bg-white rounded-xl border divide-y">
              {recentAttempts.map((attempt, idx) => (
                <div key={`${attempt.topicId}-${attempt.timestamp}-${idx}`} className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      attempt.isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {attempt.isCorrect ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{getTopicTitle(attempt.topicId)}</p>
                      <p className="text-sm text-gray-500">
                        Answer: <span className="font-mono">{attempt.userAnswer}</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">
                    {new Date(attempt.timestamp).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {totalAttempts === 0 && examAttempts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No progress yet</h3>
            <p className="text-gray-500 mb-6">Start learning to track your progress!</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Go to Topics
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        )}
      </main>

      {/* Clear confirmation modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Clear All Progress?</h3>
            <p className="text-gray-600 mb-6">
              This will delete all your quiz attempts, scores, and exam history. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClearProgress}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
