'use client';

import { LessonSection } from '@/lib/types';
import { Math, MathBlock } from './Math';

interface LessonContentProps {
  sections: LessonSection[];
}

export function LessonContent({ sections }: LessonContentProps) {
  const renderContent = (content: string) => {
    // Split content by special tags and math
    const parts: React.ReactNode[] = [];
    let remaining = content;
    let key = 0;

    // Process the content
    while (remaining.length > 0) {
      // Check for formula block
      const formulaMatch = remaining.match(/<formula>([\s\S]*?)<\/formula>/);
      const mathMatch = remaining.match(/<math>([\s\S]*?)<\/math>/);
      const exampleMatch = remaining.match(/<example>([\s\S]*?)<\/example>/);
      const importantMatch = remaining.match(/<important>([\s\S]*?)<\/important>/);

      // Find the earliest match
      const matches = [
        formulaMatch && { type: 'formula', match: formulaMatch },
        mathMatch && { type: 'math', match: mathMatch },
        exampleMatch && { type: 'example', match: exampleMatch },
        importantMatch && { type: 'important', match: importantMatch },
      ].filter(Boolean) as { type: string; match: RegExpMatchArray }[];

      const earliest = matches.reduce((prev, curr) => {
        if (!prev) return curr;
        return (curr.match.index ?? Infinity) < (prev.match.index ?? Infinity) ? curr : prev;
      }, null as { type: string; match: RegExpMatchArray } | null);

      if (earliest && earliest.match.index !== undefined) {
        // Add text before the match
        if (earliest.match.index > 0) {
          const textBefore = remaining.slice(0, earliest.match.index);
          parts.push(...renderTextWithMarkdown(textBefore, key));
          key += 100;
        }

        // Add the matched element
        const innerContent = earliest.match[1];
        if (earliest.type === 'formula') {
          parts.push(
            <MathBlock key={key++}>{innerContent}</MathBlock>
          );
        } else if (earliest.type === 'math') {
          parts.push(
            <Math key={key++}>{innerContent}</Math>
          );
        } else if (earliest.type === 'example') {
          parts.push(
            <div key={key++} className="example">
              {renderContent(innerContent)}
            </div>
          );
        } else if (earliest.type === 'important') {
          parts.push(
            <div key={key++} className="important">
              {renderContent(innerContent)}
            </div>
          );
        }

        remaining = remaining.slice(earliest.match.index + earliest.match[0].length);
      } else {
        // No more special tags, render remaining text
        parts.push(...renderTextWithMarkdown(remaining, key));
        break;
      }
    }

    return parts;
  };

  const renderTextWithMarkdown = (text: string, baseKey: number): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    const lines = text.split('\n\n');

    lines.forEach((paragraph, pIdx) => {
      if (!paragraph.trim()) return;

      // Check for headers
      if (paragraph.startsWith('**') && paragraph.endsWith('**') && !paragraph.slice(2, -2).includes('**')) {
        parts.push(
          <h3 key={baseKey + pIdx} className="font-semibold text-lg mt-4 mb-2">
            {paragraph.slice(2, -2)}
          </h3>
        );
        return;
      }

      // Check for list items
      if (paragraph.includes('\n-') || paragraph.startsWith('-')) {
        const listItems = paragraph.split('\n').filter(line => line.trim().startsWith('-'));
        if (listItems.length > 0) {
          // Get any text before the list
          const beforeList = paragraph.split('\n').filter(line => !line.trim().startsWith('-')).join(' ').trim();
          if (beforeList) {
            parts.push(
              <p key={baseKey + pIdx + 0.1} className="mb-2">
                {renderInlineFormatting(beforeList)}
              </p>
            );
          }
          parts.push(
            <ul key={baseKey + pIdx} className="list-disc list-inside space-y-1 my-2">
              {listItems.map((item, idx) => (
                <li key={idx}>{renderInlineFormatting(item.replace(/^-\s*/, ''))}</li>
              ))}
            </ul>
          );
          return;
        }
      }

      // Check for numbered list
      if (/^\d+\./.test(paragraph.trim())) {
        const listItems = paragraph.split('\n').filter(line => /^\d+\./.test(line.trim()));
        parts.push(
          <ol key={baseKey + pIdx} className="list-decimal list-inside space-y-1 my-2">
            {listItems.map((item, idx) => (
              <li key={idx}>{renderInlineFormatting(item.replace(/^\d+\.\s*/, ''))}</li>
            ))}
          </ol>
        );
        return;
      }

      // Regular paragraph
      parts.push(
        <p key={baseKey + pIdx} className="mb-3 leading-relaxed">
          {renderInlineFormatting(paragraph.replace(/\n/g, ' '))}
        </p>
      );
    });

    return parts;
  };

  const renderInlineFormatting = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      // Check for bold
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      // Check for inline math
      const inlineMathMatch = remaining.match(/<math>(.+?)<\/math>/);

      const matches = [
        boldMatch && { type: 'bold', match: boldMatch },
        inlineMathMatch && { type: 'math', match: inlineMathMatch },
      ].filter(Boolean) as { type: string; match: RegExpMatchArray }[];

      const earliest = matches.reduce((prev, curr) => {
        if (!prev) return curr;
        return (curr.match.index ?? Infinity) < (prev.match.index ?? Infinity) ? curr : prev;
      }, null as { type: string; match: RegExpMatchArray } | null);

      if (earliest && earliest.match.index !== undefined) {
        // Add text before
        if (earliest.match.index > 0) {
          parts.push(remaining.slice(0, earliest.match.index));
        }

        // Add formatted element
        if (earliest.type === 'bold') {
          parts.push(<strong key={key++}>{earliest.match[1]}</strong>);
        } else if (earliest.type === 'math') {
          parts.push(<Math key={key++}>{earliest.match[1]}</Math>);
        }

        remaining = remaining.slice(earliest.match.index + earliest.match[0].length);
      } else {
        parts.push(remaining);
        break;
      }
    }

    return parts;
  };

  return (
    <div className="lesson-content">
      {sections.map((section, idx) => (
        <div key={idx} className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">
            {section.title}
          </h2>
          <div className="text-gray-700">
            {renderContent(section.content)}
          </div>
        </div>
      ))}
    </div>
  );
}
