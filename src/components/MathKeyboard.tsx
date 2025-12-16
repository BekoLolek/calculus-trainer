'use client';

import { useState } from 'react';
import { mathSymbols, symbolCategories, getSymbolsByCategory } from '@/lib/mathSymbols';
import { Math } from './Math';

interface MathKeyboardProps {
  onInsert: (text: string) => void;
  onClose: () => void;
}

export function MathKeyboard({ onInsert, onClose }: MathKeyboardProps) {
  const [activeCategory, setActiveCategory] = useState('numbers');

  const symbols = getSymbolsByCategory(activeCategory);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-lg">Math Symbols</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Category tabs */}
        <div className="flex overflow-x-auto border-b px-2 py-2 gap-1">
          {symbolCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Symbols grid */}
        <div className="p-4 overflow-y-auto max-h-[50vh]">
          <div className="math-keyboard">
            {symbols.map((sym, idx) => (
              <button
                key={`${sym.symbol}-${idx}`}
                onClick={() => {
                  onInsert(sym.symbol);
                }}
                className="math-key"
                title={sym.label}
              >
                {sym.category === 'operators' || sym.category === 'calculus' ? (
                  <span className="text-sm">{sym.symbol}</span>
                ) : (
                  <Math>{sym.latex}</Math>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="p-4 border-t bg-gray-50 flex gap-2">
          <button
            onClick={() => onInsert(' ')}
            className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
          >
            Space
          </button>
          <button
            onClick={() => onInsert('backspace')}
            className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
          >
            Backspace
          </button>
          <button
            onClick={onClose}
            className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
