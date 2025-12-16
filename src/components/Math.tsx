'use client';

import katex from 'katex';
import { useMemo } from 'react';

interface MathProps {
  children: string;
  display?: boolean;
  className?: string;
}

export function Math({ children, display = false, className = '' }: MathProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(children, {
        displayMode: display,
        throwOnError: false,
        trust: true,
      });
    } catch (e) {
      console.error('KaTeX error:', e);
      return children;
    }
  }, [children, display]);

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

interface MathBlockProps {
  children: string;
  className?: string;
}

export function MathBlock({ children, className = '' }: MathBlockProps) {
  return (
    <div className={`my-4 overflow-x-auto ${className}`}>
      <Math display>{children}</Math>
    </div>
  );
}
