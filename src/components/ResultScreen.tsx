import React from 'react';

interface ResultScreenProps {
  score: number;
  total: number;
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, total, onRestart }) => {
  const percentage = Math.round((score / total) * 100);
  
  return (
    <div className="result-card">
      <h2>Quiz Complete!</h2>
      <p className="final-score">Your Score: {score} / {total}</p>
      <p className="percentage">{percentage}%</p>
      <button className="restart-btn" onClick={onRestart}>Restart Quiz</button>
    </div>
  );
};

export default ResultScreen;
