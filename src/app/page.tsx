'use client';

import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { topics } from '@/lib/topics';
import { getAllTopicsProgress } from '@/lib/storage';
import { useEffect, useState } from 'react';
import { TopicProgress } from '@/lib/types';

export default function Home() {
  const [progress, setProgress] = useState<Record<string, TopicProgress>>({});

  useEffect(() => {
    setProgress(getAllTopicsProgress());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Calculus Trainer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master calculus with interactive lessons and quizzes. Track your progress and ace your exam.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <div className="bg-white rounded-xl border p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">11</div>
            <div className="text-sm text-gray-500">Topics</div>
          </div>
          <div className="bg-white rounded-xl border p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {Object.values(progress).filter(p => p.bestScore >= 80).length}
            </div>
            <div className="text-sm text-gray-500">Mastered</div>
          </div>
          <div className="bg-white rounded-xl border p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {Object.values(progress).reduce((sum, p) => sum + p.totalAttempts, 0)}
            </div>
            <div className="text-sm text-gray-500">Total Attempts</div>
          </div>
        </div>

        {/* Topics Grid */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Topics</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {topics.map((topic) => {
            const topicProgress = progress[topic.id];
            const bestScore = topicProgress?.bestScore ?? 0;

            return (
              <Link
                key={topic.id}
                href={`/topic/${topic.id}`}
                className="topic-card bg-white rounded-xl border p-6 hover:border-blue-300"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
                    bestScore >= 80
                      ? 'bg-green-100 text-green-700'
                      : bestScore > 0
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {topic.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 truncate">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {topic.description}
                    </p>
                    {topicProgress && (
                      <div className="mt-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 progress-bar">
                            <div
                              className={`progress-fill ${
                                bestScore >= 80 ? 'bg-green-500' : bestScore > 0 ? 'bg-yellow-500' : ''
                              }`}
                              style={{ width: `${bestScore}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-600">
                            {bestScore}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Final Exam CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Ready for the Final Exam?</h2>
          <p className="text-blue-100 mb-6">
            Test your knowledge with questions based on the actual CAL1 2025 exam.
          </p>
          <Link
            href="/exam"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
          >
            Take Final Exam
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </main>

      <footer className="border-t mt-16 py-8 text-center text-sm text-gray-500">
        <p>CAL1 2025 - Calculus Trainer</p>
      </footer>
    </div>
  );
}
