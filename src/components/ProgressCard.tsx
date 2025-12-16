'use client';

import { TopicProgress } from '@/lib/types';

interface ProgressCardProps {
  topicId: string;
  topicTitle: string;
  progress: TopicProgress | null;
}

export function ProgressCard({ topicId, topicTitle, progress }: ProgressCardProps) {
  const bestScore = progress?.bestScore ?? 0;
  const totalAttempts = progress?.totalAttempts ?? 0;
  const lastAttempt = progress?.lastAttemptDate
    ? new Date(progress.lastAttemptDate).toLocaleDateString()
    : 'Never';

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-gray-400';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-gray-300';
  };

  return (
    <div className="bg-white rounded-xl border p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-gray-900 truncate pr-2">{topicTitle}</h3>
        <span className={`font-bold text-lg ${getScoreColor(bestScore)}`}>
          {bestScore}%
        </span>
      </div>

      <div className="progress-bar mb-3">
        <div
          className={`progress-fill ${getProgressColor(bestScore)}`}
          style={{ width: `${bestScore}%` }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-500">
        <span>{totalAttempts} attempts</span>
        <span>Last: {lastAttempt}</span>
      </div>
    </div>
  );
}
