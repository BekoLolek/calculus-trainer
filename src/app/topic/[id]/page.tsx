'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { LessonContent } from '@/components/LessonContent';
import { Quiz } from '@/components/Quiz';
import { topics, getTopicById } from '@/lib/topics';
import { useState } from 'react';

export default function TopicPage() {
  const params = useParams();
  const topicId = params.id as string;
  const topic = getTopicById(topicId);
  const [showQuiz, setShowQuiz] = useState(false);

  if (!topic) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Topic not found</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Go back to topics
          </Link>
        </main>
      </div>
    );
  }

  // Find prev and next topics
  const currentIndex = topics.findIndex(t => t.id === topicId);
  const prevTopic = currentIndex > 0 ? topics[currentIndex - 1] : null;
  const nextTopic = currentIndex < topics.length - 1 ? topics[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-700">Topics</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900">{topic.shortTitle}</span>
        </div>

        {/* Topic Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center text-xl font-bold">
              {topic.number}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{topic.title}</h1>
              <p className="text-gray-600">{topic.description}</p>
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex gap-2 mb-8 border-b">
          <button
            onClick={() => setShowQuiz(false)}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              !showQuiz
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Lesson
          </button>
          <button
            onClick={() => setShowQuiz(true)}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              showQuiz
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Quiz ({topic.quiz.length} questions)
          </button>
        </div>

        {/* Content */}
        {!showQuiz ? (
          <div className="bg-white rounded-xl border p-8">
            <LessonContent sections={topic.lessons} />

            <div className="mt-8 pt-8 border-t text-center">
              <p className="text-gray-600 mb-4">Ready to test your knowledge?</p>
              <button
                onClick={() => setShowQuiz(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Take the Quiz
              </button>
            </div>
          </div>
        ) : (
          <Quiz questions={topic.quiz} topicId={topic.id} />
        )}

        {/* Navigation between topics */}
        <div className="mt-12 flex items-center justify-between">
          {prevTopic ? (
            <Link
              href={`/topic/${prevTopic.id}`}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <div className="text-right">
                <div className="text-xs text-gray-400">Previous</div>
                <div className="font-medium">{prevTopic.shortTitle}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextTopic ? (
            <Link
              href={`/topic/${nextTopic.id}`}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <div>
                <div className="text-xs text-gray-400">Next</div>
                <div className="font-medium">{nextTopic.shortTitle}</div>
              </div>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <Link
              href="/exam"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <div>
                <div className="text-xs text-blue-400">Completed all topics!</div>
                <div className="font-medium">Take Final Exam</div>
              </div>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
