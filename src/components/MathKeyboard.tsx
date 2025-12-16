'use client';

import { useRef, useEffect } from 'react';
import { MathBlock } from './Math';

interface MathKeyboardProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  onSubmit?: () => void;
  placeholder?: string;
  question?: string;
  questionLatex?: string;
}

// Organized symbols - most used first
const symbolGroups = [
  {
    label: 'Numbers',
    symbols: [
      { display: '1', insert: '1' },
      { display: '2', insert: '2' },
      { display: '3', insert: '3' },
      { display: '4', insert: '4' },
      { display: '5', insert: '5' },
      { display: '6', insert: '6' },
      { display: '7', insert: '7' },
      { display: '8', insert: '8' },
      { display: '9', insert: '9' },
      { display: '0', insert: '0' },
    ],
  },
  {
    label: 'Variables',
    symbols: [
      { display: 'x', insert: 'x' },
      { display: 'y', insert: 'y' },
      { display: 'z', insert: 'z' },
      { display: 't', insert: 't' },
      { display: 'n', insert: 'n' },
      { display: 'C', insert: 'C' },
    ],
  },
  {
    label: 'Calculus',
    symbols: [
      { display: 'dx', insert: 'dx' },
      { display: 'dy', insert: 'dy' },
      { display: 'dt', insert: 'dt' },
      { display: '∫', insert: '∫' },
      { display: '∂', insert: '∂' },
      { display: 'd', insert: 'd' },
      { display: '∞', insert: '∞' },
      { display: 'lim', insert: 'lim' },
      { display: '→', insert: '→' },
      { display: 'Σ', insert: 'Σ' },
      { display: '′', insert: "'" },
      { display: '∇', insert: '∇' },
    ],
  },
  {
    label: 'Operators',
    symbols: [
      { display: '+', insert: '+' },
      { display: '−', insert: '-' },
      { display: '×', insert: '*' },
      { display: '÷', insert: '/' },
      { display: '=', insert: '=' },
      { display: '^', insert: '^' },
      { display: '√', insert: '√' },
      { display: '(', insert: '(' },
      { display: ')', insert: ')' },
      { display: '[', insert: '[' },
      { display: ']', insert: ']' },
      { display: '|', insert: '|' },
    ],
  },
  {
    label: 'Functions',
    symbols: [
      { display: 'sin', insert: 'sin' },
      { display: 'cos', insert: 'cos' },
      { display: 'tan', insert: 'tan' },
      { display: 'ln', insert: 'ln' },
      { display: 'log', insert: 'log' },
      { display: 'e^', insert: 'e^' },
    ],
  },
  {
    label: 'Greek',
    symbols: [
      { display: 'π', insert: 'π' },
      { display: 'e', insert: 'e' },
      { display: 'α', insert: 'α' },
      { display: 'β', insert: 'β' },
      { display: 'θ', insert: 'θ' },
      { display: 'λ', insert: 'λ' },
      { display: 'μ', insert: 'μ' },
      { display: 'σ', insert: 'σ' },
      { display: 'δ', insert: 'δ' },
      { display: 'ε', insert: 'ε' },
      { display: 'φ', insert: 'φ' },
      { display: 'ω', insert: 'ω' },
    ],
  },
  {
    label: 'Relations',
    symbols: [
      { display: '<', insert: '<' },
      { display: '>', insert: '>' },
      { display: '≤', insert: '≤' },
      { display: '≥', insert: '≥' },
      { display: '≠', insert: '≠' },
      { display: '±', insert: '±' },
      { display: '≈', insert: '≈' },
      { display: '∈', insert: '∈' },
    ],
  },
];

export function MathKeyboard({ value, onChange, onClose, onSubmit, placeholder, question, questionLatex }: MathKeyboardProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input when modal opens
    inputRef.current?.focus();
  }, []);

  const handleInsert = (text: string) => {
    onChange(value + text);
    inputRef.current?.focus();
  };

  const handleBackspace = () => {
    onChange(value.slice(0, -1));
    inputRef.current?.focus();
  };

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'Enter' && onSubmit) {
      onSubmit();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header with close button */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <h3 className="font-semibold text-lg text-gray-900">Math Input</h3>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Question display */}
        {(question || questionLatex) && (
          <div className="px-4 py-3 bg-blue-50 border-b">
            <div className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">Question</div>
            {question && <p className="text-gray-800 font-medium">{question}</p>}
            {questionLatex && (
              <div className="mt-1">
                <MathBlock>{questionLatex}</MathBlock>
              </div>
            )}
          </div>
        )}

        {/* Input field inside modal */}
        <div className="p-4 border-b">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder || 'Type your answer...'}
              className="flex-1 px-4 py-3 text-xl font-mono border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
              autoFocus
            />
            <button
              type="button"
              onClick={handleBackspace}
              className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              title="Backspace"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414-6.414a2 2 0 011.414-.586H19a2 2 0 012 2v10a2 2 0 01-2 2h-8.172a2 2 0 01-1.414-.586L3 12z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl transition-colors font-medium"
              title="Clear"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Symbol grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {symbolGroups.map((group) => (
              <div key={group.label}>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  {group.label}
                </div>
                <div className="grid grid-cols-6 sm:grid-cols-10 gap-1.5">
                  {group.symbols.map((sym, idx) => (
                    <button
                      key={`${sym.insert}-${idx}`}
                      type="button"
                      onClick={() => handleInsert(sym.insert)}
                      className="h-11 flex items-center justify-center bg-gray-100 hover:bg-blue-100 hover:text-blue-700 rounded-lg font-medium text-gray-800 transition-colors text-lg"
                    >
                      {sym.display}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer with done button */}
        <div className="p-4 border-t bg-gray-50 flex gap-3">
          <button
            type="button"
            onClick={() => handleInsert(' ')}
            className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-colors"
          >
            Space
          </button>
          <div className="flex-1" />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
