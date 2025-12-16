import { MathSymbol } from './types';

export const mathSymbols: MathSymbol[] = [
  // Common
  { symbol: '+', latex: '+', label: 'Plus', category: 'common' },
  { symbol: '-', latex: '-', label: 'Minus', category: 'common' },
  { symbol: '=', latex: '=', label: 'Equals', category: 'common' },
  { symbol: '(', latex: '(', label: 'Left Paren', category: 'common' },
  { symbol: ')', latex: ')', label: 'Right Paren', category: 'common' },
  { symbol: '[', latex: '[', label: 'Left Bracket', category: 'common' },
  { symbol: ']', latex: ']', label: 'Right Bracket', category: 'common' },
  { symbol: ',', latex: ',', label: 'Comma', category: 'common' },
  { symbol: '.', latex: '.', label: 'Decimal', category: 'common' },
  { symbol: '/', latex: '/', label: 'Divide', category: 'common' },
  { symbol: '*', latex: '\\cdot', label: 'Multiply', category: 'common' },
  { symbol: '^', latex: '^', label: 'Power', category: 'common' },
  { symbol: '_', latex: '_', label: 'Subscript', category: 'common' },
  { symbol: '!', latex: '!', label: 'Factorial', category: 'common' },

  // Numbers
  { symbol: '0', latex: '0', label: '0', category: 'numbers' },
  { symbol: '1', latex: '1', label: '1', category: 'numbers' },
  { symbol: '2', latex: '2', label: '2', category: 'numbers' },
  { symbol: '3', latex: '3', label: '3', category: 'numbers' },
  { symbol: '4', latex: '4', label: '4', category: 'numbers' },
  { symbol: '5', latex: '5', label: '5', category: 'numbers' },
  { symbol: '6', latex: '6', label: '6', category: 'numbers' },
  { symbol: '7', latex: '7', label: '7', category: 'numbers' },
  { symbol: '8', latex: '8', label: '8', category: 'numbers' },
  { symbol: '9', latex: '9', label: '9', category: 'numbers' },

  // Greek Letters
  { symbol: 'π', latex: '\\pi', label: 'Pi', category: 'greek' },
  { symbol: 'e', latex: 'e', label: 'Euler\'s e', category: 'greek' },
  { symbol: 'α', latex: '\\alpha', label: 'Alpha', category: 'greek' },
  { symbol: 'β', latex: '\\beta', label: 'Beta', category: 'greek' },
  { symbol: 'γ', latex: '\\gamma', label: 'Gamma', category: 'greek' },
  { symbol: 'δ', latex: '\\delta', label: 'Delta', category: 'greek' },
  { symbol: 'ε', latex: '\\epsilon', label: 'Epsilon', category: 'greek' },
  { symbol: 'θ', latex: '\\theta', label: 'Theta', category: 'greek' },
  { symbol: 'λ', latex: '\\lambda', label: 'Lambda', category: 'greek' },
  { symbol: 'μ', latex: '\\mu', label: 'Mu', category: 'greek' },
  { symbol: 'σ', latex: '\\sigma', label: 'Sigma', category: 'greek' },
  { symbol: 'φ', latex: '\\phi', label: 'Phi', category: 'greek' },
  { symbol: 'ω', latex: '\\omega', label: 'Omega', category: 'greek' },
  { symbol: 'Δ', latex: '\\Delta', label: 'Delta (cap)', category: 'greek' },
  { symbol: 'Σ', latex: '\\Sigma', label: 'Sigma (cap)', category: 'greek' },
  { symbol: 'η', latex: '\\eta', label: 'Eta', category: 'greek' },

  // Calculus Operators
  { symbol: '∫', latex: '\\int', label: 'Integral', category: 'calculus' },
  { symbol: '∬', latex: '\\iint', label: 'Double Integral', category: 'calculus' },
  { symbol: 'd', latex: 'd', label: 'd (differential)', category: 'calculus' },
  { symbol: '∂', latex: '\\partial', label: 'Partial', category: 'calculus' },
  { symbol: '∇', latex: '\\nabla', label: 'Nabla/Gradient', category: 'calculus' },
  { symbol: '′', latex: '\'', label: 'Prime', category: 'calculus' },
  { symbol: 'lim', latex: '\\lim', label: 'Limit', category: 'calculus' },
  { symbol: '→', latex: '\\to', label: 'Approaches', category: 'calculus' },
  { symbol: '∞', latex: '\\infty', label: 'Infinity', category: 'calculus' },
  { symbol: 'Σ', latex: '\\sum', label: 'Sum', category: 'calculus' },
  { symbol: '∏', latex: '\\prod', label: 'Product', category: 'calculus' },
  { symbol: 'dx', latex: 'dx', label: 'dx', category: 'calculus' },
  { symbol: 'dy', latex: 'dy', label: 'dy', category: 'calculus' },
  { symbol: 'dt', latex: 'dt', label: 'dt', category: 'calculus' },

  // Relations
  { symbol: '<', latex: '<', label: 'Less than', category: 'relations' },
  { symbol: '>', latex: '>', label: 'Greater than', category: 'relations' },
  { symbol: '≤', latex: '\\leq', label: 'Less or equal', category: 'relations' },
  { symbol: '≥', latex: '\\geq', label: 'Greater or equal', category: 'relations' },
  { symbol: '≠', latex: '\\neq', label: 'Not equal', category: 'relations' },
  { symbol: '≈', latex: '\\approx', label: 'Approximately', category: 'relations' },
  { symbol: '±', latex: '\\pm', label: 'Plus/Minus', category: 'relations' },
  { symbol: '∈', latex: '\\in', label: 'Element of', category: 'relations' },

  // Operators/Functions
  { symbol: '√', latex: '\\sqrt{}', label: 'Square root', category: 'operators' },
  { symbol: 'sin', latex: '\\sin', label: 'Sine', category: 'operators' },
  { symbol: 'cos', latex: '\\cos', label: 'Cosine', category: 'operators' },
  { symbol: 'tan', latex: '\\tan', label: 'Tangent', category: 'operators' },
  { symbol: 'ln', latex: '\\ln', label: 'Natural log', category: 'operators' },
  { symbol: 'log', latex: '\\log', label: 'Logarithm', category: 'operators' },
  { symbol: 'exp', latex: '\\exp', label: 'Exponential', category: 'operators' },
  { symbol: 'sin⁻¹', latex: '\\sin^{-1}', label: 'Arcsin', category: 'operators' },
  { symbol: 'cos⁻¹', latex: '\\cos^{-1}', label: 'Arccos', category: 'operators' },
  { symbol: 'tan⁻¹', latex: '\\tan^{-1}', label: 'Arctan', category: 'operators' },
  { symbol: '|x|', latex: '|', label: 'Absolute value', category: 'operators' },
  { symbol: 'x²', latex: '^2', label: 'Squared', category: 'operators' },
  { symbol: 'x³', latex: '^3', label: 'Cubed', category: 'operators' },
  { symbol: 'xⁿ', latex: '^n', label: 'Power n', category: 'operators' },
  { symbol: 'e^x', latex: 'e^', label: 'e to the', category: 'operators' },
  { symbol: 'frac', latex: '\\frac{}{}', label: 'Fraction', category: 'operators' },
];

export const symbolCategories = [
  { id: 'numbers', label: '0-9' },
  { id: 'common', label: 'Common' },
  { id: 'greek', label: 'Greek' },
  { id: 'calculus', label: 'Calculus' },
  { id: 'operators', label: 'Functions' },
  { id: 'relations', label: 'Relations' },
];

export function getSymbolsByCategory(category: string): MathSymbol[] {
  return mathSymbols.filter(s => s.category === category);
}
