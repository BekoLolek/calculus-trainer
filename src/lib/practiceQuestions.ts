// Practice question generator with variable numbers
// Each generator creates a question with randomized values and computes the correct answer

export interface PracticeQuestion {
  id: string;
  category: string;
  question: string;
  questionLatex?: string;
  answer: string;
  answerLatex?: string;
  acceptableAnswers?: string[];
  explanation: string;
}

type QuestionGenerator = () => PracticeQuestion;

// Helper functions
const randInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randNonZero = (min: number, max: number): number => {
  let n = 0;
  while (n === 0) n = randInt(min, max);
  return n;
};

const formatCoef = (n: number, isFirst: boolean = false): string => {
  if (n === 1) return isFirst ? '' : '+';
  if (n === -1) return '-';
  if (n > 0) return isFirst ? `${n}` : `+${n}`;
  return `${n}`;
};

const formatTerm = (coef: number, variable: string, isFirst: boolean = false): string => {
  if (coef === 0) return '';
  if (coef === 1) return isFirst ? variable : `+${variable}`;
  if (coef === -1) return `-${variable}`;
  if (coef > 0) return isFirst ? `${coef}${variable}` : `+${coef}${variable}`;
  return `${coef}${variable}`;
};

// GCD for fraction simplification
const gcd = (a: number, b: number): number => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
};

const simplifyFraction = (num: number, den: number): [number, number] => {
  if (den === 0) return [num, den];
  const g = gcd(num, den);
  let sNum = num / g;
  let sDen = den / g;
  if (sDen < 0) {
    sNum = -sNum;
    sDen = -sDen;
  }
  return [sNum, sDen];
};

// ============ DERIVATIVE QUESTIONS ============

const derivativePolynomial: QuestionGenerator = () => {
  const a = randNonZero(-5, 5);
  const n = randInt(2, 6);
  const b = randNonZero(-5, 5);
  const m = randInt(1, 4);

  // f(x) = ax^n + bx^m
  // f'(x) = anx^(n-1) + bmx^(m-1)
  const da = a * n;
  const dn = n - 1;
  const db = b * m;
  const dm = m - 1;

  let answer = '';
  let answerLatex = '';

  if (dn === 0 && dm === 0) {
    answer = `${da + db}`;
    answerLatex = `${da + db}`;
  } else if (dn === 0) {
    answer = `${db}x^${dm}+${da}`.replace('+-', '-');
    answerLatex = dm === 1 ? `${db}x + ${da}` : `${db}x^{${dm}} + ${da}`;
  } else if (dm === 0) {
    answer = `${da}x^${dn}+${db}`.replace('+-', '-');
    answerLatex = dn === 1 ? `${da}x + ${db}` : `${da}x^{${dn}} + ${db}`;
  } else {
    const term1 = dn === 1 ? `${da}x` : `${da}x^${dn}`;
    const term2 = dm === 1 ? `${db}x` : `${db}x^${dm}`;
    answer = `${term1}+${term2}`.replace('+-', '-');

    const latexTerm1 = dn === 1 ? `${da}x` : `${da}x^{${dn}}`;
    const latexTerm2 = dm === 1 ? `${db}x` : `${db}x^{${dm}}`;
    answerLatex = `${latexTerm1} + ${latexTerm2}`.replace('+ -', '- ');
  }

  const questionLatex = `\\frac{d}{dx}\\left(${a}x^{${n}} + ${b}x^{${m}}\\right)`.replace('+ -', '- ');

  return {
    id: `deriv-poly-${Date.now()}-${Math.random()}`,
    category: 'Derivatives',
    question: 'Find the derivative:',
    questionLatex,
    answer: answer.replace(/\s/g, ''),
    answerLatex,
    acceptableAnswers: [answer.replace(/\s/g, ''), answerLatex?.replace(/\s/g, '')].filter(Boolean) as string[],
    explanation: `Using the power rule: d/dx(x^n) = nx^(n-1). So ${a}·${n}x^${n-1} + ${b}·${m}x^${m-1} = ${answer}`,
  };
};

const derivativeTrig: QuestionGenerator = () => {
  const a = randNonZero(-4, 4);
  const funcs = [
    { f: 'sin', df: 'cos' },
    { f: 'cos', df: '-sin' },
    { f: 'tan', df: 'sec^2' },
  ];
  const choice = funcs[randInt(0, funcs.length - 1)];

  let answer: string;
  let answerLatex: string;

  if (choice.df.startsWith('-')) {
    const coef = -a;
    answer = `${coef}${choice.df.slice(1)}(x)`;
    answerLatex = `${coef}\\${choice.df.slice(1)}(x)`;
  } else {
    answer = `${a}${choice.df}(x)`;
    answerLatex = choice.df === 'sec^2' ? `${a}\\sec^2(x)` : `${a}\\${choice.df}(x)`;
  }

  return {
    id: `deriv-trig-${Date.now()}-${Math.random()}`,
    category: 'Derivatives',
    question: 'Find the derivative:',
    questionLatex: `\\frac{d}{dx}\\left(${a}\\${choice.f}(x)\\right)`,
    answer: answer.replace(/\s/g, ''),
    answerLatex,
    acceptableAnswers: [answer, `${a}${choice.df}x`, answer.replace('(x)', 'x')],
    explanation: `d/dx(${choice.f}(x)) = ${choice.df}(x), so the answer is ${a} · ${choice.df}(x) = ${answer}`,
  };
};

const derivativeExponential: QuestionGenerator = () => {
  const a = randNonZero(-4, 4);
  const b = randNonZero(-3, 3);

  // d/dx(a·e^(bx)) = a·b·e^(bx)
  const coef = a * b;

  return {
    id: `deriv-exp-${Date.now()}-${Math.random()}`,
    category: 'Derivatives',
    question: 'Find the derivative:',
    questionLatex: `\\frac{d}{dx}\\left(${a}e^{${b}x}\\right)`,
    answer: `${coef}e^(${b}x)`,
    answerLatex: `${coef}e^{${b}x}`,
    acceptableAnswers: [`${coef}e^(${b}x)`, `${coef}e^${b}x`, `${coef}exp(${b}x)`],
    explanation: `Using chain rule: d/dx(e^(bx)) = b·e^(bx). So ${a}·${b}·e^(${b}x) = ${coef}e^(${b}x)`,
  };
};

const derivativeChainRule: QuestionGenerator = () => {
  const a = randNonZero(2, 5);
  const b = randNonZero(-3, 3);
  const n = randInt(2, 4);

  // d/dx((ax+b)^n) = n·a·(ax+b)^(n-1)
  const coef = n * a;
  const newExp = n - 1;

  const inner = b > 0 ? `${a}x+${b}` : `${a}x${b}`;
  const innerLatex = b > 0 ? `${a}x+${b}` : `${a}x${b}`;

  return {
    id: `deriv-chain-${Date.now()}-${Math.random()}`,
    category: 'Derivatives',
    question: 'Find the derivative using the chain rule:',
    questionLatex: `\\frac{d}{dx}\\left((${innerLatex})^{${n}}\\right)`,
    answer: newExp === 1 ? `${coef}(${inner})` : `${coef}(${inner})^${newExp}`,
    answerLatex: newExp === 1 ? `${coef}(${innerLatex})` : `${coef}(${innerLatex})^{${newExp}}`,
    acceptableAnswers: [
      `${coef}(${inner})^${newExp}`,
      `${coef}(${inner})^(${newExp})`,
      newExp === 1 ? `${coef}(${inner})` : '',
    ].filter(Boolean),
    explanation: `Chain rule: d/dx(u^n) = n·u^(n-1)·u'. Here u = ${inner}, u' = ${a}, so ${n}·${a}·(${inner})^${newExp} = ${coef}(${inner})^${newExp}`,
  };
};

const derivativeProductRule: QuestionGenerator = () => {
  const a = randNonZero(1, 3);

  // d/dx(x·e^(ax)) = e^(ax) + ax·e^(ax) = (1+ax)e^(ax)
  return {
    id: `deriv-product-${Date.now()}-${Math.random()}`,
    category: 'Derivatives',
    question: 'Find the derivative using the product rule:',
    questionLatex: `\\frac{d}{dx}\\left(x \\cdot e^{${a}x}\\right)`,
    answer: `(1+${a}x)e^(${a}x)`,
    answerLatex: `(1+${a}x)e^{${a}x}`,
    acceptableAnswers: [
      `(1+${a}x)e^(${a}x)`,
      `e^(${a}x)+${a}xe^(${a}x)`,
      `e^(${a}x)(1+${a}x)`,
      `(${a}x+1)e^(${a}x)`,
    ],
    explanation: `Product rule: (fg)' = f'g + fg'. Here f=x, g=e^(${a}x), f'=1, g'=${a}e^(${a}x). Result: e^(${a}x) + ${a}x·e^(${a}x) = (1+${a}x)e^(${a}x)`,
  };
};

// ============ INTEGRAL QUESTIONS ============

const integralPolynomial: QuestionGenerator = () => {
  const a = randNonZero(-5, 5);
  const n = randInt(1, 5);

  // ∫ax^n dx = a/(n+1) · x^(n+1) + C
  const newExp = n + 1;
  const [num, den] = simplifyFraction(a, newExp);

  let answer: string;
  let answerLatex: string;

  if (den === 1) {
    answer = `${num}x^${newExp}+C`;
    answerLatex = `${num}x^{${newExp}} + C`;
  } else {
    answer = `(${num}/${den})x^${newExp}+C`;
    answerLatex = `\\frac{${num}}{${den}}x^{${newExp}} + C`;
  }

  return {
    id: `int-poly-${Date.now()}-${Math.random()}`,
    category: 'Integrals',
    question: 'Evaluate the integral:',
    questionLatex: `\\int ${a}x^{${n}} \\, dx`,
    answer: answer.replace(/\s/g, ''),
    answerLatex,
    acceptableAnswers: [answer.replace(/\s/g, ''), answer.replace('+C', '+ C')],
    explanation: `∫x^n dx = x^(n+1)/(n+1) + C. So ${a}·x^${newExp}/${newExp} = ${answer}`,
  };
};

const integralTrig: QuestionGenerator = () => {
  const a = randNonZero(-4, 4);
  const funcs = [
    { f: 'sin', intf: '-cos' },
    { f: 'cos', intf: 'sin' },
    { f: 'sec^2', intf: 'tan' },
  ];
  const choice = funcs[randInt(0, funcs.length - 1)];

  let answer: string;
  let answerLatex: string;

  if (choice.intf.startsWith('-')) {
    const coef = -a;
    answer = `${coef}${choice.intf.slice(1)}(x)+C`;
    answerLatex = `${coef}\\${choice.intf.slice(1)}(x) + C`;
  } else {
    answer = `${a}${choice.intf}(x)+C`;
    answerLatex = `${a}\\${choice.intf}(x) + C`;
  }

  const funcLatex = choice.f === 'sec^2' ? `\\sec^2` : `\\${choice.f}`;

  return {
    id: `int-trig-${Date.now()}-${Math.random()}`,
    category: 'Integrals',
    question: 'Evaluate the integral:',
    questionLatex: `\\int ${a}${funcLatex}(x) \\, dx`,
    answer: answer.replace(/\s/g, ''),
    answerLatex,
    acceptableAnswers: [answer.replace(/\s/g, ''), answer.replace('(x)', 'x')],
    explanation: `∫${choice.f}(x) dx = ${choice.intf}(x) + C. So ${a}·${choice.intf}(x) + C = ${answer}`,
  };
};

const integralExponential: QuestionGenerator = () => {
  const a = randNonZero(-4, 4);
  const b = randNonZero(-3, 3);

  // ∫a·e^(bx) dx = (a/b)·e^(bx) + C
  const [num, den] = simplifyFraction(a, b);

  let answer: string;
  let answerLatex: string;

  if (den === 1) {
    answer = `${num}e^(${b}x)+C`;
    answerLatex = `${num}e^{${b}x} + C`;
  } else if (den === -1) {
    answer = `${-num}e^(${b}x)+C`;
    answerLatex = `${-num}e^{${b}x} + C`;
  } else {
    answer = `(${num}/${den})e^(${b}x)+C`;
    answerLatex = `\\frac{${num}}{${den}}e^{${b}x} + C`;
  }

  return {
    id: `int-exp-${Date.now()}-${Math.random()}`,
    category: 'Integrals',
    question: 'Evaluate the integral:',
    questionLatex: `\\int ${a}e^{${b}x} \\, dx`,
    answer: answer.replace(/\s/g, ''),
    answerLatex,
    acceptableAnswers: [answer.replace(/\s/g, ''), answer.replace('+C', '+ C')],
    explanation: `∫e^(bx) dx = (1/b)e^(bx) + C. So (${a}/${b})·e^(${b}x) + C = ${answer}`,
  };
};

const integralBySubstitution: QuestionGenerator = () => {
  const a = randInt(2, 4);
  const n = randInt(2, 4);

  // ∫x(x^2+a)^n dx, let u = x^2+a, du = 2x dx
  // = (1/2)∫u^n du = (1/2)·u^(n+1)/(n+1) = (x^2+a)^(n+1)/(2(n+1))
  const newExp = n + 1;
  const den = 2 * newExp;
  const [sNum, sDen] = simplifyFraction(1, den);

  let coef: string;
  let coefLatex: string;
  if (sDen === 1) {
    coef = sNum === 1 ? '' : `${sNum}`;
    coefLatex = sNum === 1 ? '' : `${sNum}`;
  } else {
    coef = `(1/${sDen})`;
    coefLatex = `\\frac{1}{${sDen}}`;
  }

  return {
    id: `int-sub-${Date.now()}-${Math.random()}`,
    category: 'Integrals',
    question: 'Evaluate using substitution:',
    questionLatex: `\\int x(x^2+${a})^{${n}} \\, dx`,
    answer: `${coef}(x^2+${a})^${newExp}+C`.replace(/\s/g, ''),
    answerLatex: `${coefLatex}(x^2+${a})^{${newExp}} + C`,
    acceptableAnswers: [
      `${coef}(x^2+${a})^${newExp}+C`.replace(/\s/g, ''),
      `(x^2+${a})^${newExp}/${den}+C`,
      `(1/${den})(x^2+${a})^${newExp}+C`,
    ],
    explanation: `Let u = x²+${a}, du = 2x dx. Then ∫x·u^${n} dx = (1/2)∫u^${n} du = u^${newExp}/${2*newExp} + C = (x²+${a})^${newExp}/${den} + C`,
  };
};

// ============ LIMIT QUESTIONS ============

const limitPolynomial: QuestionGenerator = () => {
  const a = randInt(-3, 3);
  const b = randNonZero(-4, 4);
  const c = randNonZero(-4, 4);

  // lim(x→a) (bx + c) = ba + c
  const answer = b * a + c;

  return {
    id: `limit-poly-${Date.now()}-${Math.random()}`,
    category: 'Limits',
    question: 'Evaluate the limit:',
    questionLatex: `\\lim_{x \\to ${a}} (${b}x + ${c})`.replace('+ -', '- '),
    answer: `${answer}`,
    answerLatex: `${answer}`,
    acceptableAnswers: [`${answer}`],
    explanation: `Direct substitution: ${b}(${a}) + ${c} = ${b*a} + ${c} = ${answer}`,
  };
};

const limitRational: QuestionGenerator = () => {
  const a = randInt(1, 4);

  // lim(x→a) (x²-a²)/(x-a) = lim (x+a)(x-a)/(x-a) = lim (x+a) = 2a
  const answer = 2 * a;

  return {
    id: `limit-rat-${Date.now()}-${Math.random()}`,
    category: 'Limits',
    question: 'Evaluate the limit:',
    questionLatex: `\\lim_{x \\to ${a}} \\frac{x^2 - ${a*a}}{x - ${a}}`,
    answer: `${answer}`,
    answerLatex: `${answer}`,
    acceptableAnswers: [`${answer}`],
    explanation: `Factor: (x²-${a*a})/(x-${a}) = (x+${a})(x-${a})/(x-${a}) = x+${a}. As x→${a}: ${a}+${a} = ${answer}`,
  };
};

const limitInfinity: QuestionGenerator = () => {
  const a = randNonZero(1, 4);
  const b = randNonZero(1, 4);

  // lim(x→∞) (ax²+1)/(bx²+2) = a/b
  const [num, den] = simplifyFraction(a, b);
  const answer = den === 1 ? `${num}` : `${num}/${den}`;
  const answerLatex = den === 1 ? `${num}` : `\\frac{${num}}{${den}}`;

  return {
    id: `limit-inf-${Date.now()}-${Math.random()}`,
    category: 'Limits',
    question: 'Evaluate the limit:',
    questionLatex: `\\lim_{x \\to \\infty} \\frac{${a}x^2 + 1}{${b}x^2 + 2}`,
    answer,
    answerLatex,
    acceptableAnswers: [answer, `${a}/${b}`, `${num}/${den}`],
    explanation: `For rational functions, compare leading coefficients: ${a}x²/${b}x² = ${a}/${b} = ${answer}`,
  };
};

// ============ SERIES QUESTIONS ============

const seriesGeometric: QuestionGenerator = () => {
  const a = randInt(1, 4);
  const r = randInt(2, 5);

  // Sum of 1/r^n from n=0 to ∞ = 1/(1-1/r) = r/(r-1)
  // Sum of a/r^n = a·r/(r-1)
  const num = a * r;
  const den = r - 1;
  const [sNum, sDen] = simplifyFraction(num, den);

  const answer = sDen === 1 ? `${sNum}` : `${sNum}/${sDen}`;
  const answerLatex = sDen === 1 ? `${sNum}` : `\\frac{${sNum}}{${sDen}}`;

  return {
    id: `series-geo-${Date.now()}-${Math.random()}`,
    category: 'Series',
    question: 'Find the sum of the infinite series:',
    questionLatex: `\\sum_{n=0}^{\\infty} \\frac{${a}}{${r}^n}`,
    answer,
    answerLatex,
    acceptableAnswers: [answer, `${num}/${den}`, `${sNum}/${sDen}`],
    explanation: `Geometric series with a=${a}, r=1/${r}. Sum = a/(1-r) = ${a}/(1-1/${r}) = ${a}·${r}/${den} = ${answer}`,
  };
};

const seriesConvergence: QuestionGenerator = () => {
  const p = randInt(1, 3);
  const converges = p > 1;

  return {
    id: `series-conv-${Date.now()}-${Math.random()}`,
    category: 'Series',
    question: `Does the p-series converge or diverge?`,
    questionLatex: `\\sum_{n=1}^{\\infty} \\frac{1}{n^{${p}}}`,
    answer: converges ? 'converges' : 'diverges',
    answerLatex: converges ? '\\text{converges}' : '\\text{diverges}',
    acceptableAnswers: converges ? ['converges', 'convergent', 'conv'] : ['diverges', 'divergent', 'div'],
    explanation: `A p-series ∑1/n^p converges if p > 1 and diverges if p ≤ 1. Since p = ${p}, the series ${converges ? 'converges' : 'diverges'}.`,
  };
};

// ============ TAYLOR SERIES QUESTIONS ============

const taylorCoefficient: QuestionGenerator = () => {
  const funcs = [
    { name: 'e^x', coeffs: [1, 1, 0.5, 1/6, 1/24], terms: ['1', '1', '1/2', '1/6', '1/24'] },
    { name: 'sin(x)', coeffs: [0, 1, 0, -1/6, 0], terms: ['0', '1', '0', '-1/6', '0'] },
    { name: 'cos(x)', coeffs: [1, 0, -0.5, 0, 1/24], terms: ['1', '0', '-1/2', '0', '1/24'] },
  ];
  const func = funcs[randInt(0, funcs.length - 1)];
  const n = randInt(0, 4);

  return {
    id: `taylor-coef-${Date.now()}-${Math.random()}`,
    category: 'Taylor Series',
    question: `What is the coefficient of x^${n} in the Maclaurin series of ${func.name}?`,
    questionLatex: `\\text{Coefficient of } x^{${n}} \\text{ in the Maclaurin series of } ${func.name.replace('e^x', 'e^x').replace('sin(x)', '\\sin(x)').replace('cos(x)', '\\cos(x)')}`,
    answer: func.terms[n],
    answerLatex: func.terms[n],
    acceptableAnswers: [func.terms[n], `${func.coeffs[n]}`],
    explanation: `The Maclaurin series of ${func.name} has coefficient ${func.terms[n]} for the x^${n} term.`,
  };
};

// ============ PARTIAL DERIVATIVES ============

const partialDerivative: QuestionGenerator = () => {
  const a = randNonZero(2, 5);
  const b = randNonZero(2, 5);
  const withRespectTo = Math.random() > 0.5 ? 'x' : 'y';

  // f(x,y) = ax²y + bxy²
  // ∂f/∂x = 2axy + by²
  // ∂f/∂y = ax² + 2bxy

  let answer: string;
  let answerLatex: string;

  if (withRespectTo === 'x') {
    answer = `${2*a}xy+${b}y^2`.replace('+-', '-');
    answerLatex = `${2*a}xy + ${b}y^2`.replace('+ -', '- ');
  } else {
    answer = `${a}x^2+${2*b}xy`.replace('+-', '-');
    answerLatex = `${a}x^2 + ${2*b}xy`.replace('+ -', '- ');
  }

  return {
    id: `partial-${Date.now()}-${Math.random()}`,
    category: 'Partial Derivatives',
    question: `Find the partial derivative with respect to ${withRespectTo}:`,
    questionLatex: `\\frac{\\partial}{\\partial ${withRespectTo}}\\left(${a}x^2y + ${b}xy^2\\right)`,
    answer: answer.replace(/\s/g, ''),
    answerLatex,
    acceptableAnswers: [answer.replace(/\s/g, '')],
    explanation: withRespectTo === 'x'
      ? `∂/∂x: treat y as constant. ${a}·2xy + ${b}y² = ${2*a}xy + ${b}y²`
      : `∂/∂y: treat x as constant. ${a}x² + ${b}·2xy = ${a}x² + ${2*b}xy`,
  };
};

// ============ DIFFERENTIAL EQUATIONS ============

const separableODE: QuestionGenerator = () => {
  const a = randNonZero(1, 4);

  // dy/dx = ay → y = Ce^(ax)
  return {
    id: `ode-sep-${Date.now()}-${Math.random()}`,
    category: 'Differential Equations',
    question: 'Solve the differential equation:',
    questionLatex: `\\frac{dy}{dx} = ${a}y`,
    answer: `Ce^(${a}x)`,
    answerLatex: `Ce^{${a}x}`,
    acceptableAnswers: [`Ce^(${a}x)`, `Ce^${a}x`, `y=Ce^(${a}x)`, `ce^(${a}x)`],
    explanation: `Separable ODE: dy/y = ${a}dx. Integrate both sides: ln|y| = ${a}x + C₁. So y = Ce^(${a}x).`,
  };
};

const linearODE: QuestionGenerator = () => {
  const k = randInt(2, 5);

  // dy/dx + ky = 0 → y = Ce^(-kx)
  return {
    id: `ode-lin-${Date.now()}-${Math.random()}`,
    category: 'Differential Equations',
    question: 'Solve the differential equation:',
    questionLatex: `\\frac{dy}{dx} + ${k}y = 0`,
    answer: `Ce^(-${k}x)`,
    answerLatex: `Ce^{-${k}x}`,
    acceptableAnswers: [`Ce^(-${k}x)`, `Ce^-${k}x`, `y=Ce^(-${k}x)`, `ce^(-${k}x)`],
    explanation: `First-order linear ODE. Integrating factor or separation gives y = Ce^(-${k}x).`,
  };
};

// ============ ALL GENERATORS ============

const allGenerators: QuestionGenerator[] = [
  // Derivatives (5)
  derivativePolynomial,
  derivativeTrig,
  derivativeExponential,
  derivativeChainRule,
  derivativeProductRule,
  // Integrals (4)
  integralPolynomial,
  integralTrig,
  integralExponential,
  integralBySubstitution,
  // Limits (3)
  limitPolynomial,
  limitRational,
  limitInfinity,
  // Series (2)
  seriesGeometric,
  seriesConvergence,
  // Taylor (1)
  taylorCoefficient,
  // Partial Derivatives (1)
  partialDerivative,
  // ODEs (2)
  separableODE,
  linearODE,
];

export function generatePracticeQuestion(): PracticeQuestion {
  const generator = allGenerators[randInt(0, allGenerators.length - 1)];
  return generator();
}

export function generatePracticeQuestionByCategory(category: string): PracticeQuestion {
  const categoryGenerators = allGenerators.filter(gen => {
    const sample = gen();
    return sample.category.toLowerCase().includes(category.toLowerCase());
  });

  if (categoryGenerators.length === 0) {
    return generatePracticeQuestion();
  }

  const generator = categoryGenerators[randInt(0, categoryGenerators.length - 1)];
  return generator();
}

export const practiceCategories = [
  'All Topics',
  'Derivatives',
  'Integrals',
  'Limits',
  'Series',
  'Taylor Series',
  'Partial Derivatives',
  'Differential Equations',
];
