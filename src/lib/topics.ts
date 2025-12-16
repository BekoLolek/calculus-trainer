import { Topic } from './types';

export const topics: Topic[] = [
  {
    id: 'functions-limits-continuity',
    number: 1,
    title: 'Functions, Limits and Continuity',
    shortTitle: 'Functions & Limits',
    description: 'Learn about functions, their representations, limits, and continuity concepts.',
    lessons: [
      {
        title: 'What is a Function?',
        content: `A **function** is a rule that assigns exactly one output to each input. We write f(x) to denote the function f applied to input x.

<formula>y = f(x)</formula>

**Four ways to represent a function:**
1. **Verbally** - Describe in words
2. **Numerically** - Table of values
3. **Visually** - Graph
4. **Algebraically** - Formula

**The Vertical Line Test:** A graph represents a function if and only if no vertical line intersects the graph more than once.

**Domain** is the set of all valid inputs (x-values).
**Range** is the set of all possible outputs (y-values).`
      },
      {
        title: 'Limits',
        content: `A **limit** describes what value a function approaches as the input approaches some value.

<formula>\\lim_{x \\to a} f(x) = L</formula>

This means: as x gets closer and closer to a, f(x) gets closer and closer to L.

**One-sided limits:**
- Left-hand limit: <math>\\lim_{x \\to a^-} f(x)</math>
- Right-hand limit: <math>\\lim_{x \\to a^+} f(x)</math>

**The Sandwich (Squeeze) Theorem:**
If <math>g(x) \\leq f(x) \\leq h(x)</math> for all x near a, and <math>\\lim_{x \\to a} g(x) = \\lim_{x \\to a} h(x) = L</math>, then <math>\\lim_{x \\to a} f(x) = L</math>.

<example>
**Example:** Show that <math>\\lim_{x \\to \\infty} \\frac{\\sin x}{x} = 0</math>

Since <math>-1 \\leq \\sin x \\leq 1</math>, we have <math>\\frac{-1}{x} \\leq \\frac{\\sin x}{x} \\leq \\frac{1}{x}</math>

Both bounds approach 0 as x → ∞, so by the Sandwich Theorem, the limit is 0.
</example>`
      },
      {
        title: 'Continuity',
        content: `A function f is **continuous at x = a** if:
1. f(a) is defined
2. <math>\\lim_{x \\to a} f(x)</math> exists
3. <math>\\lim_{x \\to a} f(x) = f(a)</math>

Equivalently: <math>\\lim_{h \\to 0} f(a + h) = f(a)</math>

**Types of Discontinuities:**
- **Removable discontinuity:** The limit exists but doesn't equal f(a) (or f(a) is undefined). Can be "fixed" by redefining one point.
- **Jump discontinuity:** Left and right limits exist but are different.
- **Infinite discontinuity:** The function approaches ±∞.

<important>
A continuous function has no breaks, jumps, or holes in its graph.
</important>`
      }
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'What is the limit as x approaches infinity of sin(x)/x?',
        questionLatex: '\\lim_{x \\to \\infty} \\frac{\\sin x}{x} = ?',
        answer: '0',
        acceptableAnswers: ['0', '0.0'],
        hint: 'Use the Sandwich Theorem with -1 ≤ sin(x) ≤ 1',
        explanation: 'Since -1/x ≤ sin(x)/x ≤ 1/x and both bounds approach 0, the limit is 0.'
      },
      {
        id: 'q1-2',
        question: 'If f(x) = x² and g(x) = 1/x, what is (f ∘ g)(x)?',
        questionLatex: 'f(x) = x^2, \\quad g(x) = \\frac{1}{x}, \\quad (f \\circ g)(x) = ?',
        answer: '1/x^2',
        acceptableAnswers: ['1/x^2', '1/x²', 'x^(-2)', 'x^-2'],
        hint: 'Composition means f(g(x))',
        explanation: '(f ∘ g)(x) = f(g(x)) = f(1/x) = (1/x)² = 1/x²'
      },
      {
        id: 'q1-3',
        question: 'A function is continuous at x = a if the limit equals what?',
        answer: 'f(a)',
        acceptableAnswers: ['f(a)', 'the function value', 'f(a) the function value at a'],
        hint: 'The third condition for continuity',
        explanation: 'For continuity: lim(x→a) f(x) = f(a)'
      },
      {
        id: 'q1-4',
        question: 'What type of discontinuity can be "fixed" by redefining one point?',
        answer: 'removable',
        acceptableAnswers: ['removable', 'removable discontinuity'],
        hint: 'Think about a hole in a graph',
        explanation: 'A removable discontinuity occurs when the limit exists but the function value differs or is undefined.'
      }
    ]
  },
  {
    id: 'derivatives',
    number: 2,
    title: 'Derivatives',
    shortTitle: 'Derivatives',
    description: 'Master the definition of derivatives, differentiation rules, and L\'Hôpital\'s rule.',
    lessons: [
      {
        title: 'Definition of the Derivative',
        content: `The **derivative** of f at x is defined as:

<formula>f'(x) = \\lim_{\\Delta x \\to 0} \\frac{f(x + \\Delta x) - f(x)}{\\Delta x}</formula>

Or equivalently:
<formula>f'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}</formula>

**Interpretation:**
- Geometrically: slope of the tangent line at x
- Physically: instantaneous rate of change

**Notation:** f'(x), dy/dx, df/dx, Df(x) all mean the same thing.

<important>
If a function is differentiable at a point, it must be continuous there. But a continuous function may not be differentiable (e.g., |x| at x = 0).
</important>`
      },
      {
        title: 'Differentiation Rules',
        content: `**Basic Rules:**
- Constant: <math>\\frac{d}{dx}(c) = 0</math>
- Power Rule: <math>\\frac{d}{dx}(x^n) = nx^{n-1}</math>
- Sum Rule: <math>(f + g)' = f' + g'</math>
- Product Rule: <math>(fg)' = f'g + fg'</math>
- Quotient Rule: <math>\\left(\\frac{f}{g}\\right)' = \\frac{f'g - fg'}{g^2}</math>
- Chain Rule: <math>\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)</math>

**Common Derivatives:**
- <math>\\frac{d}{dx}(e^x) = e^x</math>
- <math>\\frac{d}{dx}(\\ln x) = \\frac{1}{x}</math>
- <math>\\frac{d}{dx}(\\sin x) = \\cos x</math>
- <math>\\frac{d}{dx}(\\cos x) = -\\sin x</math>

<example>
**Example:** Find <math>\\frac{d}{dx}[\\sin(x^2)]</math>

Using Chain Rule: <math>\\cos(x^2) \\cdot 2x = 2x\\cos(x^2)</math>
</example>`
      },
      {
        title: 'L\'Hôpital\'s Rule',
        content: `**Indeterminate forms:** 0/0, ∞/∞, 0·∞, ∞-∞, 0⁰, ∞⁰, 1^∞

**L'Hôpital's Rule:** If <math>\\lim_{x \\to a} \\frac{f(x)}{g(x)}</math> gives 0/0 or ∞/∞, then:

<formula>\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f'(x)}{g'(x)}</formula>

(provided the right-hand limit exists)

<example>
**Example:** <math>\\lim_{x \\to 0} \\frac{\\tan x}{x}</math>

This is 0/0, so apply L'Hôpital's Rule:
<math>\\lim_{x \\to 0} \\frac{\\sec^2 x}{1} = \\sec^2(0) = 1</math>
</example>`
      }
    ],
    quiz: [
      {
        id: 'q2-1',
        question: 'What is the derivative of x² - 4x³?',
        questionLatex: '\\frac{d}{dx}(x^2 - 4x^3) = ?',
        answer: '2x - 12x^2',
        acceptableAnswers: ['2x - 12x^2', '2x-12x^2', '2x - 12x²'],
        hint: 'Use the power rule on each term',
        explanation: 'd/dx(x²) = 2x, d/dx(-4x³) = -12x²'
      },
      {
        id: 'q2-2',
        question: 'What is the derivative of sin(x²)?',
        questionLatex: '\\frac{d}{dx}\\sin(x^2) = ?',
        answer: '2xcos(x^2)',
        acceptableAnswers: ['2xcos(x^2)', '2x*cos(x^2)', '2x cos(x^2)', '2xcos(x²)'],
        hint: 'Use the chain rule',
        explanation: 'Chain rule: cos(x²) · 2x = 2x cos(x²)'
      },
      {
        id: 'q2-3',
        question: 'Using L\'Hôpital\'s rule, what is the limit of tan(x)/x as x approaches 0?',
        questionLatex: '\\lim_{x \\to 0} \\frac{\\tan x}{x} = ?',
        answer: '1',
        acceptableAnswers: ['1', '1.0'],
        hint: 'This is 0/0, take derivatives of top and bottom',
        explanation: 'lim(sec²x/1) = sec²(0) = 1'
      },
      {
        id: 'q2-4',
        question: 'What is the derivative of π (the constant)?',
        questionLatex: '\\frac{d}{dx}\\pi = ?',
        answer: '0',
        acceptableAnswers: ['0', '0.0'],
        hint: 'π is a constant',
        explanation: 'The derivative of any constant is 0.'
      }
    ]
  },
  {
    id: 'optimization-newton',
    number: 3,
    title: 'Optimization and Newton\'s Method',
    shortTitle: 'Optimization',
    description: 'Learn to find maximum and minimum values, and solve equations numerically.',
    lessons: [
      {
        title: 'Finding Extreme Values',
        content: `**Critical Points:** Points where f'(x) = 0 or f'(x) doesn't exist.

**Types of Extrema:**
- **Local (relative) maximum/minimum:** Largest/smallest value in some neighborhood
- **Global (absolute) maximum/minimum:** Largest/smallest value on entire domain

**Finding Extrema on [a, b]:**
1. Find all critical points in (a, b)
2. Evaluate f at critical points and endpoints
3. Compare all values

**First Derivative Test:**
- If f' changes from + to − at c, then f(c) is a local maximum
- If f' changes from − to + at c, then f(c) is a local minimum

**Second Derivative Test:**
- If f'(c) = 0 and f''(c) > 0, then local minimum
- If f'(c) = 0 and f''(c) < 0, then local maximum`
      },
      {
        title: 'Newton\'s Method',
        content: `**Newton's Method** finds roots of equations by iteration:

<formula>x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}</formula>

**Algorithm:**
1. Start with initial guess x₀
2. Compute x₁ using the formula
3. Repeat until |xₙ₊₁ - xₙ| is small enough

<example>
**Example:** Estimate π using sin(x) = 0, starting at x₀ = 3

<math>x_1 = 3 - \\frac{\\sin(3)}{\\cos(3)} = 3 - \\frac{0.1411}{-0.9900} \\approx 3.1425</math>

<math>x_2 \\approx 3.14159265</math> (already very accurate!)
</example>

**Newton's Method for Optimization:**
To find where f'(x) = 0, apply Newton's method to f':
<formula>x_{n+1} = x_n - \\frac{f'(x_n)}{f''(x_n)}</formula>`
      }
    ],
    quiz: [
      {
        id: 'q3-1',
        question: 'For f(x) = -x² + 3x, at what x value is the maximum?',
        questionLatex: 'f(x) = -x^2 + 3x \\text{ has maximum at } x = ?',
        answer: '3/2',
        acceptableAnswers: ['3/2', '1.5', '1,5'],
        hint: 'Set f\'(x) = 0 and solve',
        explanation: 'f\'(x) = -2x + 3 = 0 → x = 3/2'
      },
      {
        id: 'q3-2',
        question: 'In Newton\'s method, what do you subtract from xₙ?',
        answer: 'f(x)/f\'(x)',
        acceptableAnswers: ['f(x)/f\'(x)', 'f(xn)/f\'(xn)', 'f(x_n)/f\'(x_n)'],
        hint: 'The Newton iteration formula',
        explanation: 'xₙ₊₁ = xₙ - f(xₙ)/f\'(xₙ)'
      },
      {
        id: 'q3-3',
        question: 'If f\'\'(c) > 0 and f\'(c) = 0, is c a local minimum or maximum?',
        answer: 'minimum',
        acceptableAnswers: ['minimum', 'min', 'local minimum'],
        hint: 'Second derivative test',
        explanation: 'Positive second derivative means concave up, so it\'s a minimum.'
      }
    ]
  },
  {
    id: 'integrals',
    number: 4,
    title: 'Integrals',
    shortTitle: 'Integrals',
    description: 'Understand Riemann sums, definite and indefinite integrals, and the Fundamental Theorem.',
    lessons: [
      {
        title: 'Riemann Sums and Definite Integrals',
        content: `**Riemann Sum:** Approximates area under a curve by summing rectangles:

<formula>S_n = \\sum_{k=1}^{n} f\\left(a + k\\frac{b-a}{n}\\right) \\cdot \\frac{b-a}{n}</formula>

**Definite Integral:** The limit of Riemann sums as n → ∞:

<formula>\\int_a^b f(x)\\,dx = \\lim_{n \\to \\infty} S_n</formula>

**Interpretation:** The signed area between f(x) and the x-axis from a to b.`
      },
      {
        title: 'Indefinite Integrals and Antiderivatives',
        content: `An **antiderivative** of f is a function F such that F'(x) = f(x).

**Indefinite Integral:** <math>\\int f(x)\\,dx = F(x) + C</math>

**Basic Integrals:**
- <math>\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C</math> (n ≠ -1)
- <math>\\int \\frac{1}{x}\\,dx = \\ln|x| + C</math>
- <math>\\int e^x\\,dx = e^x + C</math>
- <math>\\int \\sin x\\,dx = -\\cos x + C</math>
- <math>\\int \\cos x\\,dx = \\sin x + C</math>

**Evaluation Theorem (FTC Part 2):**
<formula>\\int_a^b f(x)\\,dx = F(b) - F(a)</formula>

where F is any antiderivative of f.`
      },
      {
        title: 'Integration Techniques Preview',
        content: `**Integration by Substitution:**
If you see f(g(x))·g'(x), let u = g(x):
<formula>\\int f(g(x)) \\cdot g'(x)\\,dx = \\int f(u)\\,du</formula>

**Integration by Parts:**
<formula>\\int u\\,dv = uv - \\int v\\,du</formula>

Choose u and dv wisely! LIATE rule: Logarithms, Inverse trig, Algebraic, Trigonometric, Exponential`
      }
    ],
    quiz: [
      {
        id: 'q4-1',
        question: 'What is the integral of (x + 1) dx?',
        questionLatex: '\\int (x + 1)\\,dx = ?',
        answer: 'x^2/2 + x + C',
        acceptableAnswers: ['x^2/2 + x + C', 'x²/2 + x + C', '(x^2)/2 + x + C', '0.5x^2 + x + C'],
        hint: 'Use the power rule for integration',
        explanation: '∫x dx = x²/2, ∫1 dx = x, plus constant C'
      },
      {
        id: 'q4-2',
        question: 'What is the integral of e^(2x) dx?',
        questionLatex: '\\int e^{2x}\\,dx = ?',
        answer: 'e^(2x)/2 + C',
        acceptableAnswers: ['e^(2x)/2 + C', '(1/2)e^(2x) + C', '0.5e^(2x) + C'],
        hint: 'Account for the chain rule in reverse',
        explanation: 'When integrating e^(ax), divide by a: (1/2)e^(2x) + C'
      },
      {
        id: 'q4-3',
        question: 'What does the definite integral from a to b represent geometrically?',
        answer: 'area',
        acceptableAnswers: ['area', 'signed area', 'area under the curve'],
        hint: 'Think about what Riemann sums measure',
        explanation: 'The definite integral represents the signed area between the curve and x-axis.'
      }
    ]
  },
  {
    id: 'integration-techniques',
    number: 5,
    title: 'Integration Techniques',
    shortTitle: 'Integration Tech.',
    description: 'Master substitution, parts, and trigonometric integration methods.',
    lessons: [
      {
        title: 'Integration by Substitution',
        content: `**Method:** When you see a composite function with its derivative nearby.

**Steps:**
1. Choose u = g(x) (the inner function)
2. Calculate du = g'(x)dx
3. Substitute everything in terms of u
4. Integrate with respect to u
5. Substitute back to x

<example>
**Example:** <math>\\int (\\cos x)^2 \\sin x\\,dx</math>

Let u = cos(x), then du = -sin(x)dx

<math>= -\\int u^2\\,du = -\\frac{u^3}{3} + C = -\\frac{\\cos^3 x}{3} + C</math>
</example>`
      },
      {
        title: 'Integration by Parts',
        content: `**Formula:** <math>\\int u\\,dv = uv - \\int v\\,du</math>

**LIATE Rule** for choosing u (in order of preference):
- **L**ogarithmic functions (ln x)
- **I**nverse trig functions (arcsin, arctan)
- **A**lgebraic functions (x², x)
- **T**rigonometric functions (sin, cos)
- **E**xponential functions (eˣ)

<example>
**Example:** <math>\\int x \\sin x\\,dx</math>

Let u = x (algebraic), dv = sin(x)dx
Then du = dx, v = -cos(x)

<math>= -x\\cos x - \\int -\\cos x\\,dx = -x\\cos x + \\sin x + C</math>
</example>`
      },
      {
        title: 'Even and Odd Functions',
        content: `**Even function:** f(-x) = f(x) — symmetric about y-axis
**Odd function:** f(-x) = -f(x) — symmetric about origin

**Integration shortcut on symmetric intervals [-a, a]:**

<formula>\\int_{-a}^{a} f(x)\\,dx = \\begin{cases} 2\\int_0^a f(x)\\,dx & \\text{if f is even} \\\\ 0 & \\text{if f is odd} \\end{cases}</formula>

**Examples:**
- Even: x², cos(x), |x|
- Odd: x³, sin(x), tan(x)
- Neither: eˣ, x² + x`
      },
      {
        title: 'Trigonometric Substitution',
        content: `Use when you see these patterns:

| Expression | Substitution | Identity used |
|------------|-------------|---------------|
| √(a² - x²) | x = a sin θ | 1 - sin²θ = cos²θ |
| √(a² + x²) | x = a tan θ | 1 + tan²θ = sec²θ |
| √(x² - a²) | x = a sec θ | sec²θ - 1 = tan²θ |

<example>
**Example:** <math>\\int \\frac{1}{1+x^2}\\,dx</math>

Let x = tan(θ), then dx = sec²(θ)dθ

<math>= \\int \\frac{\\sec^2\\theta}{1 + \\tan^2\\theta}\\,d\\theta = \\int \\frac{\\sec^2\\theta}{\\sec^2\\theta}\\,d\\theta = \\theta + C = \\tan^{-1}x + C</math>
</example>`
      }
    ],
    quiz: [
      {
        id: 'q5-1',
        question: 'Is x²exp(-x²) an even or odd function?',
        questionLatex: 'f(x) = x^2 e^{-x^2} \\text{ is even or odd?}',
        answer: 'even',
        acceptableAnswers: ['even'],
        hint: 'Check f(-x) and compare to f(x)',
        explanation: 'f(-x) = (-x)²e^(-(-x)²) = x²e^(-x²) = f(x), so it\'s even.'
      },
      {
        id: 'q5-2',
        question: 'What is the integral of 1/(1+x²) dx?',
        questionLatex: '\\int \\frac{1}{1+x^2}\\,dx = ?',
        answer: 'arctan(x) + C',
        acceptableAnswers: ['arctan(x) + C', 'tan^(-1)(x) + C', 'tan^-1(x) + C', 'atan(x) + C'],
        hint: 'This is a standard result from trig substitution',
        explanation: 'Using x = tan(θ) substitution gives arctan(x) + C'
      },
      {
        id: 'q5-3',
        question: 'In the LIATE rule, what does L stand for?',
        answer: 'logarithmic',
        acceptableAnswers: ['logarithmic', 'logarithm', 'log'],
        hint: 'The first choice for u in integration by parts',
        explanation: 'LIATE: Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential'
      }
    ]
  },
  {
    id: 'improper-integrals',
    number: 6,
    title: 'Improper Integrals',
    shortTitle: 'Improper Integrals',
    description: 'Handle integrals with infinite limits or discontinuous integrands.',
    lessons: [
      {
        title: 'Types of Improper Integrals',
        content: `An integral is **improper** if:
1. One or both limits are infinite
2. The integrand is unbounded in the interval

**Type 1: Infinite Limits**
<formula>\\int_a^{\\infty} f(x)\\,dx = \\lim_{b \\to \\infty} \\int_a^b f(x)\\,dx</formula>

**Type 2: Discontinuous Integrand**
If f is discontinuous at c in [a, b]:
<formula>\\int_a^b f(x)\\,dx = \\lim_{t \\to c^-} \\int_a^t f(x)\\,dx + \\lim_{t \\to c^+} \\int_t^b f(x)\\,dx</formula>

An improper integral **converges** if the limit exists and is finite.
It **diverges** if the limit is infinite or doesn't exist.`
      },
      {
        title: 'Comparison Tests',
        content: `**Direct Comparison Test:**
If 0 ≤ f(x) ≤ g(x) for all x ≥ a:
- If <math>\\int_a^{\\infty} g(x)\\,dx</math> converges, so does <math>\\int_a^{\\infty} f(x)\\,dx</math>
- If <math>\\int_a^{\\infty} f(x)\\,dx</math> diverges, so does <math>\\int_a^{\\infty} g(x)\\,dx</math>

**Limit Comparison Test:**
If <math>\\lim_{x \\to \\infty} \\frac{f(x)}{g(x)} = L</math> where 0 < L < ∞, then <math>\\int_a^{\\infty} f(x)\\,dx</math> and <math>\\int_a^{\\infty} g(x)\\,dx</math> either both converge or both diverge.

**p-integral Reference:**
<formula>\\int_1^{\\infty} \\frac{1}{x^p}\\,dx \\begin{cases} \\text{converges} & \\text{if } p > 1 \\\\ \\text{diverges} & \\text{if } p \\leq 1 \\end{cases}</formula>`
      }
    ],
    quiz: [
      {
        id: 'q6-1',
        question: 'What is the value of the integral from 1 to infinity of 3/x² dx?',
        questionLatex: '\\int_1^{\\infty} \\frac{3}{x^2}\\,dx = ?',
        answer: '3',
        acceptableAnswers: ['3', '3.0'],
        hint: 'Integrate 3x^(-2), then take limit as upper bound goes to infinity',
        explanation: '∫3x⁻² dx = -3/x. Evaluating from 1 to ∞: 0 - (-3) = 3'
      },
      {
        id: 'q6-2',
        question: 'Does the integral from 1 to infinity of 1/x^π converge or diverge?',
        questionLatex: '\\int_1^{\\infty} \\frac{1}{x^{\\pi}}\\,dx',
        answer: 'converges',
        acceptableAnswers: ['converges', 'converge'],
        hint: 'π ≈ 3.14, compare to p-integral rule',
        explanation: 'Since π > 1, the p-integral converges.'
      },
      {
        id: 'q6-3',
        question: 'What is the integral from 0 to 1 of ln(x) dx?',
        questionLatex: '\\int_0^1 \\ln x\\,dx = ?',
        answer: '-1',
        acceptableAnswers: ['-1', '-1.0'],
        hint: 'Use integration by parts, then handle the improper limit at 0',
        explanation: 'Using parts with u=ln(x), dv=dx: [x ln(x) - x] from 0 to 1 = -1'
      }
    ]
  },
  {
    id: 'infinite-series',
    number: 7,
    title: 'Infinite Series',
    shortTitle: 'Infinite Series',
    description: 'Understand sequences, series, convergence tests, and geometric series.',
    lessons: [
      {
        title: 'Sequences and Series',
        content: `A **sequence** {aₙ} is an ordered list of numbers: a₁, a₂, a₃, ...

An **infinite series** is the sum of a sequence:
<formula>\\sum_{n=1}^{\\infty} a_n = a_1 + a_2 + a_3 + \\cdots</formula>

The **nth partial sum** is: <math>S_n = \\sum_{k=1}^{n} a_k</math>

The series **converges** if <math>\\lim_{n \\to \\infty} S_n</math> exists and is finite.`
      },
      {
        title: 'Geometric Series',
        content: `A **geometric series** has the form:
<formula>\\sum_{n=0}^{\\infty} ar^n = a + ar + ar^2 + ar^3 + \\cdots</formula>

**Convergence:**
- Converges to <math>\\frac{a}{1-r}</math> if |r| < 1
- Diverges if |r| ≥ 1

<example>
**Example:** <math>\\sum_{n=1}^{\\infty} \\left(\\frac{2}{5}\\right)^{n-1}</math>

Here a = 1, r = 2/5. Since |2/5| < 1:
Sum = <math>\\frac{1}{1 - 2/5} = \\frac{1}{3/5} = \\frac{5}{3}</math>
</example>`
      },
      {
        title: 'Convergence Tests',
        content: `**nth Term Test:** If <math>\\lim_{n \\to \\infty} a_n \\neq 0</math>, the series diverges.
(But if limit = 0, the test is inconclusive!)

**Integral Test:** If f is positive and decreasing, then <math>\\sum_{n=1}^{\\infty} f(n)</math> and <math>\\int_1^{\\infty} f(x)\\,dx</math> either both converge or both diverge.

**Remainder Estimation:** If the integral test applies:
<formula>\\int_{n+1}^{\\infty} f(x)\\,dx \\leq R_n \\leq \\int_n^{\\infty} f(x)\\,dx</formula>

where Rₙ is the remainder after n terms.`
      }
    ],
    quiz: [
      {
        id: 'q7-1',
        question: 'Does the sum from n=1 to infinity of π^(n-1) converge or diverge?',
        questionLatex: '\\sum_{n=1}^{\\infty} \\pi^{n-1}',
        answer: 'diverges',
        acceptableAnswers: ['diverges', 'diverge'],
        hint: 'This is geometric with r = π',
        explanation: 'Since |π| > 1, the geometric series diverges.'
      },
      {
        id: 'q7-2',
        question: 'What is the sum of the geometric series (2/5)^(n-1) from n=1 to infinity?',
        questionLatex: '\\sum_{n=1}^{\\infty} \\left(\\frac{2}{5}\\right)^{n-1} = ?',
        answer: '5/3',
        acceptableAnswers: ['5/3', '1.67', '1.666', '1.6667'],
        hint: 'Use a/(1-r) with a=1, r=2/5',
        explanation: 'Sum = 1/(1-2/5) = 1/(3/5) = 5/3'
      },
      {
        id: 'q7-3',
        question: 'If the limit of aₙ as n→∞ equals 5 (not zero), does the series converge or diverge?',
        answer: 'diverges',
        acceptableAnswers: ['diverges', 'diverge'],
        hint: 'nth term test',
        explanation: 'By the nth term test, if lim(aₙ) ≠ 0, the series must diverge.'
      }
    ]
  },
  {
    id: 'taylor-maclaurin',
    number: 8,
    title: 'Taylor and Maclaurin Series',
    shortTitle: 'Taylor Series',
    description: 'Represent functions as power series centered at a point.',
    lessons: [
      {
        title: 'Taylor Series',
        content: `The **Taylor series** of f centered at a is:
<formula>f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n</formula>

<formula>= f(a) + f'(a)(x-a) + \\frac{f''(a)}{2!}(x-a)^2 + \\frac{f'''(a)}{3!}(x-a)^3 + \\cdots</formula>

A **Maclaurin series** is a Taylor series centered at a = 0:
<formula>f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(0)}{n!}x^n</formula>`
      },
      {
        title: 'Common Maclaurin Series',
        content: `**Important series to memorize:**

<formula>e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!} = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots</formula>

<formula>\\sin x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n+1}}{(2n+1)!} = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\cdots</formula>

<formula>\\cos x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n}}{(2n)!} = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\cdots</formula>

<formula>\\frac{1}{1-x} = \\sum_{n=0}^{\\infty} x^n = 1 + x + x^2 + x^3 + \\cdots \\quad (|x| < 1)</formula>

<formula>\\ln(1+x) = \\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1} x^n}{n} = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\cdots</formula>`
      },
      {
        title: 'Applications',
        content: `**Taylor polynomials** approximate functions near a point.

The **nth degree Taylor polynomial** uses the first n+1 terms:
<formula>P_n(x) = \\sum_{k=0}^{n} \\frac{f^{(k)}(a)}{k!}(x-a)^k</formula>

<example>
**Example:** Estimate e using the Maclaurin series

<math>e = e^1 \\approx 1 + 1 + \\frac{1}{2!} + \\frac{1}{3!} + \\frac{1}{4!} + \\frac{1}{5!} + \\frac{1}{6!}</math>
<math>= 1 + 1 + 0.5 + 0.167 + 0.042 + 0.008 + 0.001 \\approx 2.718</math>
</example>

**Finding new series:** Manipulate known series!
- Substitute: sin(x²) = x² - x⁶/6 + ...
- Differentiate: d/dx(eˣ) = eˣ (same series)
- Integrate: ∫(1/(1+x²))dx = arctan(x)`
      }
    ],
    quiz: [
      {
        id: 'q8-1',
        question: 'What is the Maclaurin series of e^x up to the x³ term?',
        questionLatex: 'e^x = 1 + x + ? + \\frac{x^3}{6} + \\cdots',
        answer: 'x^2/2',
        acceptableAnswers: ['x^2/2', 'x²/2', '(x^2)/2', '0.5x^2'],
        hint: 'The coefficient is 1/n! for the xⁿ term',
        explanation: 'e^x = 1 + x + x²/2! + x³/3! + ... = 1 + x + x²/2 + x³/6 + ...'
      },
      {
        id: 'q8-2',
        question: 'In the Taylor series formula, what do you divide f^(n)(a) by?',
        answer: 'n!',
        acceptableAnswers: ['n!', 'n factorial'],
        hint: 'It\'s a factorial',
        explanation: 'Taylor series: Σ f^(n)(a)/n! · (x-a)^n'
      },
      {
        id: 'q8-3',
        question: 'The Maclaurin series of sin(x) only contains what type of powers of x?',
        answer: 'odd',
        acceptableAnswers: ['odd', 'odd powers'],
        hint: 'Look at the exponents: x¹, x³, x⁵...',
        explanation: 'sin(x) = x - x³/3! + x⁵/5! - ... (only odd powers because sin is odd)'
      }
    ]
  },
  {
    id: 'partial-derivatives',
    number: 9,
    title: 'Partial Derivatives',
    shortTitle: 'Partial Derivatives',
    description: 'Extend differentiation to functions of multiple variables.',
    lessons: [
      {
        title: 'Partial Derivatives',
        content: `For f(x, y), the **partial derivatives** are:

<formula>\\frac{\\partial f}{\\partial x} = \\lim_{h \\to 0} \\frac{f(x+h, y) - f(x, y)}{h}</formula>

<formula>\\frac{\\partial f}{\\partial y} = \\lim_{h \\to 0} \\frac{f(x, y+h) - f(x, y)}{h}</formula>

**To compute ∂f/∂x:** Treat y as a constant and differentiate with respect to x.

<example>
**Example:** f(x, y) = x²y + eʸ

<math>\\frac{\\partial f}{\\partial x} = 2xy</math> (treating y as constant)

<math>\\frac{\\partial f}{\\partial y} = x^2 + e^y</math> (treating x as constant)
</example>

**Mixed Derivative Theorem:** If fₓᵧ and fᵧₓ are continuous, then:
<formula>\\frac{\\partial^2 f}{\\partial x \\partial y} = \\frac{\\partial^2 f}{\\partial y \\partial x}</formula>`
      },
      {
        title: 'Gradient Vector',
        content: `The **gradient** of f(x, y) is the vector of partial derivatives:

<formula>\\nabla f = \\left\\langle \\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y} \\right\\rangle</formula>

**Properties:**
- ∇f points in the direction of steepest increase
- |∇f| is the rate of increase in that direction
- ∇f is perpendicular to level curves

For f(x, y, z): <math>\\nabla f = \\left\\langle \\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y}, \\frac{\\partial f}{\\partial z} \\right\\rangle</math>`
      },
      {
        title: 'Gradient Descent',
        content: `**Gradient Descent** minimizes f by moving opposite to the gradient:

<formula>\\mathbf{x}_{n+1} = \\mathbf{x}_n - \\eta \\nabla f(\\mathbf{x}_n)</formula>

where η is the **learning rate**.

**Algorithm:**
1. Start at initial point x₀
2. Compute gradient ∇f(xₙ)
3. Update: xₙ₊₁ = xₙ - η∇f(xₙ)
4. Repeat until convergence

<important>
**Learning rate matters!**
- Too small: slow convergence
- Too large: may overshoot or diverge
- Just right: fast convergence to minimum
</important>`
      }
    ],
    quiz: [
      {
        id: 'q9-1',
        question: 'For f(x,y) = 5xe^(-y) + 3y, what is ∂f/∂x?',
        questionLatex: 'f(x,y) = 5xe^{-y} + 3y, \\quad \\frac{\\partial f}{\\partial x} = ?',
        answer: '5e^(-y)',
        acceptableAnswers: ['5e^(-y)', '5e^-y', '5exp(-y)'],
        hint: 'Treat y as a constant',
        explanation: '∂/∂x(5xe^(-y)) = 5e^(-y), ∂/∂x(3y) = 0'
      },
      {
        id: 'q9-2',
        question: 'The gradient vector points in what direction?',
        answer: 'steepest increase',
        acceptableAnswers: ['steepest increase', 'direction of steepest increase', 'maximum increase'],
        hint: 'Think about climbing a hill',
        explanation: '∇f points in the direction where f increases most rapidly.'
      },
      {
        id: 'q9-3',
        question: 'In gradient descent, do you add or subtract η∇f from xₙ?',
        answer: 'subtract',
        acceptableAnswers: ['subtract'],
        hint: 'We want to minimize, not maximize',
        explanation: 'xₙ₊₁ = xₙ - η∇f(xₙ). We subtract because we want to go downhill.'
      }
    ]
  },
  {
    id: 'multiple-integrals',
    number: 10,
    title: 'Multiple Integrals',
    shortTitle: 'Multiple Integrals',
    description: 'Compute double and triple integrals over various regions.',
    lessons: [
      {
        title: 'Double Integrals',
        content: `A **double integral** integrates over a 2D region:

<formula>\\iint_R f(x, y)\\,dA</formula>

**Fubini's Theorem:** For continuous f on rectangle [a,b] × [c,d]:
<formula>\\iint_R f(x, y)\\,dA = \\int_a^b \\int_c^d f(x, y)\\,dy\\,dx = \\int_c^d \\int_a^b f(x, y)\\,dx\\,dy</formula>

**Interpretation:** If f(x,y) ≥ 0, the double integral gives the volume under the surface z = f(x,y).

<example>
**Example:** <math>\\int_0^2 \\int_{-1}^1 (x-y)\\,dy\\,dx</math>

Inner: <math>\\int_{-1}^1 (x-y)\\,dy = [xy - \\frac{y^2}{2}]_{-1}^1 = (x - \\frac{1}{2}) - (-x - \\frac{1}{2}) = 2x</math>

Outer: <math>\\int_0^2 2x\\,dx = [x^2]_0^2 = 4</math>
</example>`
      },
      {
        title: 'Non-Rectangular Regions',
        content: `For a region bounded by curves:

**Type I (vertical slices):**
<formula>\\iint_R f\\,dA = \\int_a^b \\int_{g_1(x)}^{g_2(x)} f(x,y)\\,dy\\,dx</formula>

**Type II (horizontal slices):**
<formula>\\iint_R f\\,dA = \\int_c^d \\int_{h_1(y)}^{h_2(y)} f(x,y)\\,dx\\,dy</formula>

Choose the type that makes the limits simpler!`
      },
      {
        title: 'Monte Carlo Integration',
        content: `**Monte Carlo method:** Estimate integrals using random sampling.

For <math>\\int_a^b f(x)\\,dx</math>:
1. Generate N random points xᵢ uniformly in [a, b]
2. Estimate: <math>\\int_a^b f(x)\\,dx \\approx \\frac{b-a}{N} \\sum_{i=1}^N f(x_i)</math>

**For double integrals over region R:**
<formula>\\iint_R f\\,dA \\approx \\frac{\\text{Area}(R)}{N} \\sum_{i=1}^N f(x_i, y_i)</formula>

**When to use:** High dimensions, complex regions, when exact integration is difficult.`
      }
    ],
    quiz: [
      {
        id: 'q10-1',
        question: 'What is the double integral of (x-y) over [0,2]×[-1,1]?',
        questionLatex: '\\int_0^2 \\int_{-1}^1 (x-y)\\,dy\\,dx = ?',
        answer: '4',
        acceptableAnswers: ['4', '4.0'],
        hint: 'Integrate with respect to y first, then x',
        explanation: 'Inner integral gives 2x, outer integral gives x² evaluated 0 to 2 = 4'
      },
      {
        id: 'q10-2',
        question: 'What theorem allows us to switch the order of integration?',
        answer: 'Fubini',
        acceptableAnswers: ['Fubini', 'Fubini\'s theorem', 'Fubinis theorem'],
        hint: 'Named after an Italian mathematician',
        explanation: 'Fubini\'s Theorem states that for continuous functions, we can integrate in either order.'
      },
      {
        id: 'q10-3',
        question: 'Monte Carlo integration uses what to estimate integrals?',
        answer: 'random',
        acceptableAnswers: ['random', 'random sampling', 'random points', 'random numbers'],
        hint: 'Think of the casino',
        explanation: 'Monte Carlo uses random sampling to estimate integral values.'
      }
    ]
  },
  {
    id: 'differential-equations',
    number: 11,
    title: 'Differential Equations',
    shortTitle: 'Diff. Equations',
    description: 'Solve first-order differential equations analytically and numerically.',
    lessons: [
      {
        title: 'Introduction to Differential Equations',
        content: `A **differential equation** relates a function to its derivatives.

**Order:** The highest derivative that appears.
**Ordinary DE (ODE):** Involves only ordinary derivatives (one independent variable).

**General solution:** Contains arbitrary constants.
**Particular solution:** Specific values of constants (determined by initial conditions).

**Initial Value Problem (IVP):** A DE together with initial condition(s).

<example>
**Example:** dy/dx = 2x with y(0) = 1

General solution: y = x² + C
Apply y(0) = 1: 1 = 0 + C, so C = 1
Particular solution: y = x² + 1
</example>`
      },
      {
        title: 'Separation of Variables',
        content: `**Separation of Variables** works when the DE can be written as:
<formula>\\frac{dy}{dx} = f(x) \\cdot g(y)</formula>

**Method:**
1. Rewrite as <math>\\frac{1}{g(y)}\\,dy = f(x)\\,dx</math>
2. Integrate both sides
3. Solve for y if possible

<example>
**Example:** <math>\\frac{dy}{dx} = y^2 \\sin(x)</math>

Separate: <math>\\frac{1}{y^2}\\,dy = \\sin(x)\\,dx</math>

Integrate: <math>-\\frac{1}{y} = -\\cos(x) + C</math>

Solve: <math>y = \\frac{1}{\\cos(x) - C}</math>
</example>`
      },
      {
        title: 'Euler\'s Method',
        content: `**Euler's Method** numerically approximates solutions to IVPs.

Given: <math>\\frac{dy}{dx} = f(x, y)</math> with y(x₀) = y₀

**Iteration formula:**
<formula>y_{n+1} = y_n + h \\cdot f(x_n, y_n)</formula>
<formula>x_{n+1} = x_n + h</formula>

where h is the step size.

<example>
**Example:** y' = x + 1, y(0) = 0, h = 0.1

Step 0: x₀ = 0, y₀ = 0
Step 1: y₁ = 0 + 0.1(0 + 1) = 0.1
Step 2: y₂ = 0.1 + 0.1(0.1 + 1) = 0.21
...

(Exact solution: y = x²/2 + x)
</example>

<important>
Smaller step size h gives better accuracy but requires more computations.
</important>`
      }
    ],
    quiz: [
      {
        id: 'q11-1',
        question: 'Solve: dy/dx = √(zt) where z is the variable. What technique do you use?',
        answer: 'separation of variables',
        acceptableAnswers: ['separation of variables', 'separation', 'separable'],
        hint: 'The equation can be written with z on one side and t on the other',
        explanation: 'When dy/dx = f(x)g(y), we can separate variables.'
      },
      {
        id: 'q11-2',
        question: 'In Euler\'s method, yₙ₊₁ = yₙ + h times what?',
        answer: 'f(x,y)',
        acceptableAnswers: ['f(x,y)', 'f(xn,yn)', 'f(x_n,y_n)', 'the derivative'],
        hint: 'It\'s the right-hand side of dy/dx = ...',
        explanation: 'yₙ₊₁ = yₙ + h·f(xₙ,yₙ) where dy/dx = f(x,y)'
      },
      {
        id: 'q11-3',
        question: 'If y\' = 2x and y(0) = 5, what is y(x)?',
        questionLatex: 'y\' = 2x, \\quad y(0) = 5, \\quad y(x) = ?',
        answer: 'x^2 + 5',
        acceptableAnswers: ['x^2 + 5', 'x² + 5'],
        hint: 'Integrate and use the initial condition',
        explanation: 'y = ∫2x dx = x² + C. y(0) = 5 gives C = 5.'
      }
    ]
  }
];

export function getTopicById(id: string): Topic | undefined {
  return topics.find(t => t.id === id);
}

export function getTopicByNumber(num: number): Topic | undefined {
  return topics.find(t => t.number === num);
}
