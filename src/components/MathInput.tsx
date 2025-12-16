'use client';

import { useState } from 'react';
import { MathKeyboard } from './MathKeyboard';

interface MathInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  showFeedback?: 'correct' | 'incorrect' | null;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  question?: string;
  questionLatex?: string;
}

export function MathInput({
  value,
  onChange,
  placeholder = 'Enter your answer...',
  disabled = false,
  className = '',
  showFeedback = null,
  onKeyDown,
  question,
  questionLatex,
}: MathInputProps) {
  const [showKeyboard, setShowKeyboard] = useState(false);

  const feedbackClasses = showFeedback === 'correct'
    ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
    : showFeedback === 'incorrect'
    ? 'border-red-500 bg-red-50 ring-2 ring-red-200 shake'
    : 'border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200';

  return (
    <>
      <div
        className={`relative flex items-center gap-2 border rounded-lg transition-all ${feedbackClasses} ${className}`}
      >
        {/* Regular text input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 px-4 py-3 bg-transparent outline-none text-lg font-mono"
        />

        <button
          type="button"
          onClick={() => !disabled && setShowKeyboard(true)}
          disabled={disabled}
          className="p-2 mr-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          title="Open math keyboard"
        >
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </button>

        {/* Feedback icons */}
        {showFeedback === 'correct' && (
          <div className="absolute -right-10 top-1/2 -translate-y-1/2">
            <svg className="w-7 h-7 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        {showFeedback === 'incorrect' && (
          <div className="absolute -right-10 top-1/2 -translate-y-1/2">
            <svg className="w-7 h-7 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      {showKeyboard && !disabled && (
        <MathKeyboard
          value={value}
          onChange={onChange}
          onClose={() => setShowKeyboard(false)}
          placeholder={placeholder}
          question={question}
          questionLatex={questionLatex}
        />
      )}
    </>
  );
}
