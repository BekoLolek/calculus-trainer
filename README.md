# Calculus Trainer

A web-based calculus learning platform with interactive lessons, quizzes, and progress tracking. Built for the CAL1 2025 course.

## Features

- **11 Topic Lessons** - Comprehensive coverage of calculus fundamentals
- **Interactive Quizzes** - Fill-in-the-blank questions with instant feedback
- **Math Symbol Keyboard** - Special input menu for mathematical symbols (integrals, derivatives, Greek letters, etc.)
- **Progress Tracking** - Track your improvement over time with localStorage persistence
- **Final Exam** - Comprehensive assessment based on actual exam material
- **Responsive Design** - Works on desktop and mobile devices

## Topics Covered

1. Functions, Limits and Continuity
2. Derivatives
3. Optimization and Newton's Method
4. Integrals
5. Integration Techniques
6. Improper Integrals
7. Infinite Series
8. Taylor and Maclaurin Series
9. Partial Derivatives
10. Multiple Integrals
11. Differential Equations

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Math Rendering**: KaTeX
- **Storage**: localStorage (browser-based)

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Deploy to Vercel via GitHub

### Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon in the top right, select **New repository**
3. Name it `calculus-trainer` (or any name you prefer)
4. Keep it **Public** or **Private** as you prefer
5. Do NOT initialize with README, .gitignore, or license
6. Click **Create repository**

### Step 2: Push Your Code to GitHub

Open a terminal in the `calculus-trainer` folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - Calculus Trainer app"

# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/calculus-trainer.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New...** > **Project**
3. Find and select your `calculus-trainer` repository
4. Vercel will auto-detect Next.js settings - no changes needed
5. Click **Deploy**
6. Wait for deployment to complete (usually 1-2 minutes)
7. Your site is now live at `https://calculus-trainer-xxx.vercel.app`

### Automatic Deployments

After initial setup, every push to the `main` branch will automatically trigger a new deployment on Vercel.

## Usage

1. **Home Page** - View all topics and your overall progress
2. **Topic Pages** - Read the lesson, then take the quiz
3. **Math Keyboard** - Click the input field to access math symbols
4. **Progress Page** - Track your attempts and scores over time
5. **Final Exam** - Test your knowledge with the comprehensive exam

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Home page
│   ├── exam/page.tsx     # Final exam
│   ├── progress/page.tsx # Progress tracking
│   └── topic/[id]/       # Dynamic topic pages
├── components/
│   ├── Math.tsx          # KaTeX rendering
│   ├── MathKeyboard.tsx  # Symbol input keyboard
│   ├── MathInput.tsx     # Input with math keyboard
│   ├── Quiz.tsx          # Quiz component
│   └── ...
└── lib/
    ├── topics.ts         # All topic content
    ├── examQuestions.ts  # Final exam questions
    ├── storage.ts        # localStorage helpers
    └── types.ts          # TypeScript interfaces
```

## License

MIT
