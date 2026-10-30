import React, { useState } from 'react';

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

const questions: Question[] = [
  {
    question: "What is the fastest land animal?",
    options: ["A. Lion", "B. Cheetah", "C. Horse", "D. Leopard"],
    correctIndex: 1
  },
  {
    question: "Which animal has the longest neck?",
    options: ["A. Elephant", "B. Giraffe", "C. Zebra", "D. Camel"],
    correctIndex: 1
  },
  {
    question: "What do pandas mainly eat?",
    options: ["A. Meat", "B. Fish", "C. Bamboo", "D. Fruits"],
    correctIndex: 2
  },
  {
    question: "How many legs does a spider have?",
    options: ["A. 6", "B. 8", "C. 10", "D. 12"],
    correctIndex: 1
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["A. Atlantic", "B. Indian", "C. Arctic", "D. Pacific"],
    correctIndex: 3
  }
];

const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  const progress = (current / total) * 100;
  return (
    <div className="progress-section">
      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="progress-text">Question {current} of {total}</p>
    </div>
  );
};

const ResultScreen = ({ score, total, onRestart }: { score: number; total: number; onRestart: () => void }) => {
  const percentage = Math.round((score / total) * 100);
  return (
    <div className="result-screen">
      <h2>🎉 Quiz Complete!</h2>
      <p className="score-label">Your Score:</p>
      <p className="score-value">{score} / {total}</p>
      <p className="percent-text">You got {percentage}% correct!</p>
      <button className="restart-btn" onClick={onRestart}>Play Again</button>
    </div>
  );
};

const FrontPage = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="front-page">
      <h1 className="main-title">🐾 Animal Quiz</h1>
      <p className="subtitle">Test your knowledge about amazing animals!</p>
      <button className="start-btn" onClick={onStart}>Start Quiz</button>
    </div>
  );
};

const App: React.FC = () => {
  const [showFrontPage, setShowFrontPage] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const startQuiz = () => {
    setShowFrontPage(false);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  const handleRestart = () => {
    setShowFrontPage(true);
  };

  const current = questions[currentIndex];

  const handleSelect = (index: number) => {
    if (!isAnswered) setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setIsAnswered(true);
    if (selectedAnswer === current.correctIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  if (showFrontPage) {
    return (
      <div className="app-container">
        <FrontPage onStart={startQuiz} />
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="app-container">
        <h1>🐾 Animal Quiz</h1>
        <ResultScreen score={score} total={questions.length} onRestart={handleRestart} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1>🐾 Animal Quiz</h1>
      <ProgressBar current={currentIndex + 1} total={questions.length} />
      
      <div className="question-box">
        <h2 className="question-text">{current.question}</h2>
        <div className="options-list">
          {current.options.map((opt, idx) => (
            <button
              key={idx}
              className={`option-btn ${
                isAnswered
                  ? idx === current.correctIndex
                    ? 'correct'
                    : idx === selectedAnswer
                      ? 'wrong'
                      : ''
                  : selectedAnswer === idx
                    ? 'selected'
                    : ''
              }`}
              onClick={() => handleSelect(idx)}
              disabled={isAnswered}
            >
              {opt}
            </button>
          ))}
        </div>
        
        <div className="btn-row">
          {!isAnswered ? (
            <button
              className="action-btn"
              onClick={handleCheck}
              disabled={selectedAnswer === null}
            >
              Check Answer
            </button>
          ) : (
            <button className="next-btn" onClick={handleNext}>
              {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;


