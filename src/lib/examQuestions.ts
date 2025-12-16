import { QuizQuestion } from './types';

// These are based on the actual exam questions from ExamQuestions2025.pdf
export const examQuestions: QuizQuestion[] = [
  {
    id: 'exam-1',
    question: 'Question 1 (Hydrogen Atom): The probability P(r) that the distance between a proton and electron equals r is P(r) = (4/a₀³)r²e^(-2r/a₀). What is the most probable distance r in terms of a₀?',
    questionLatex: 'P(r) = \\frac{4}{a_0^3}r^2e^{-\\frac{2r}{a_0}}',
    answer: 'a0',
    acceptableAnswers: ['a0', 'a_0', 'a₀', 'a0 (Bohr radius)'],
    hint: 'Find where P\'(r) = 0 and solve for r',
    explanation: 'Taking the derivative and setting it to zero: the most probable distance is r = a₀ (the Bohr radius).'
  },
  {
    id: 'exam-2',
    question: 'Question 2 (Stirling\'s Approximation): The integral ∫₁ⁿ ln(x)dx approximates ln(n!). Evaluate this integral to show that ln(n!) ≈ n·ln(n) - n. What is ∫ln(x)dx?',
    questionLatex: '\\int \\ln(x)\\,dx = ?',
    answer: 'xln(x) - x + C',
    acceptableAnswers: ['xln(x) - x + C', 'x*ln(x) - x + C', 'x ln(x) - x + C', 'xlnx - x + C'],
    hint: 'Use integration by parts with u = ln(x), dv = dx',
    explanation: 'Using integration by parts: ∫ln(x)dx = x·ln(x) - ∫(x·1/x)dx = x·ln(x) - x + C'
  },
  {
    id: 'exam-3',
    question: 'Question 3: Show that ∫(ln(x)/x)dx = (1/2)(ln(x))² + C. What substitution would you use for integration by substitution?',
    questionLatex: '\\int \\frac{\\ln x}{x}\\,dx = \\frac{1}{2}(\\ln x)^2 + C',
    answer: 'u = ln(x)',
    acceptableAnswers: ['u = ln(x)', 'u = lnx', 'u=ln(x)', 'ln(x)'],
    hint: 'Notice that d/dx[ln(x)] = 1/x',
    explanation: 'Let u = ln(x), then du = (1/x)dx. The integral becomes ∫u du = u²/2 + C = (ln x)²/2 + C'
  },
  {
    id: 'exam-4',
    question: 'Question 4: Evaluate the improper integral ∫₀¹ ln(x)dx. What is the value?',
    questionLatex: '\\int_0^1 \\ln x\\,dx = ?',
    answer: '-1',
    acceptableAnswers: ['-1', '-1.0'],
    hint: 'Use integration by parts and handle the limit as x approaches 0',
    explanation: '∫₀¹ ln(x)dx = [x·ln(x) - x]₀¹ = (0 - 1) - lim(x→0⁺)[x·ln(x) - x] = -1 - 0 = -1'
  },
  {
    id: 'exam-5',
    question: 'Question 5 (Snowflake Curve): In the Koch snowflake, the perimeter at step n is Pₙ = 3·(4/3)ⁿ. As n→∞, does Pₙ converge or diverge?',
    questionLatex: 'P_n = 3 \\cdot \\left(\\frac{4}{3}\\right)^n',
    answer: 'diverge',
    acceptableAnswers: ['diverge', 'diverges', 'infinity', '∞'],
    hint: 'What happens when the base of an exponential is greater than 1?',
    explanation: 'Since 4/3 > 1, the sequence (4/3)ⁿ → ∞ as n → ∞, so the perimeter diverges to infinity.'
  },
  {
    id: 'exam-6',
    question: 'Question 6 (Sinc Function): The Maclaurin series of sin(x) is x - x³/3! + x⁵/5! - ... What is sinc(0) where sinc(x) = sin(x)/x for x≠0?',
    questionLatex: '\\text{sinc}(x) = \\frac{\\sin x}{x}, \\quad \\text{sinc}(0) = ?',
    answer: '1',
    acceptableAnswers: ['1', '1.0'],
    hint: 'Use the Maclaurin series of sin(x) and divide by x',
    explanation: 'sinc(x) = (x - x³/6 + ...)/x = 1 - x²/6 + ... As x→0, sinc(x)→1, so sinc(0) = 1.'
  },
  {
    id: 'exam-7',
    question: 'Question 7 (Gradient Descent): For f(x,y) = x² + y² + x - y, starting at (1,1), with learning rate η=0.5, the gradient descent converges in how many steps?',
    questionLatex: 'f(x,y) = x^2 + y^2 + x - y',
    answer: '1',
    acceptableAnswers: ['1', 'one', '1 step'],
    hint: 'Calculate ∇f(1,1) and apply one step of gradient descent',
    explanation: '∇f = (2x+1, 2y-1). At (1,1): ∇f = (3,1). New point: (1,1) - 0.5(3,1) = (-0.5, 0.5), which is the minimum!'
  },
  {
    id: 'exam-8',
    question: 'Question 8: The double integral ∫₀¹∫₀¹ 1/(1-xy) dx dy equals Σ(1/n²) from n=1 to ∞. This sum equals π²/k. What is k?',
    questionLatex: '\\int_0^1 \\int_0^1 \\frac{1}{1-xy}\\,dx\\,dy = \\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{k}',
    answer: '6',
    acceptableAnswers: ['6', '6.0'],
    hint: 'This is the famous Basel problem result',
    explanation: 'The Basel problem: Σ(1/n²) = π²/6. This is a famous result proved by Euler.'
  },
  {
    id: 'exam-9',
    question: 'Question 9 (Drug Administration): A drug is administered at 5 mg/min and eliminated at rate ky where k=0.02/min. At steady state (dy/dt=0), what is y in mg?',
    questionLatex: '\\frac{dy}{dt} = 5 - 0.02y = 0',
    answer: '250',
    acceptableAnswers: ['250', '250 mg', '250.0'],
    hint: 'Set dy/dt = 0 and solve for y',
    explanation: 'At steady state: 5 - 0.02y = 0 → y = 5/0.02 = 250 mg'
  }
];

export function getExamQuestions(): QuizQuestion[] {
  return examQuestions;
}
