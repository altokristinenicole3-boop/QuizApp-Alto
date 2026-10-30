import React from 'react';

interface FeedbackMessageProps {
  isCorrect: boolean;
}

const FeedbackMessage: React.FC<FeedbackMessageProps> = ({ isCorrect }) => {
  return (
    <p className={`feedback ${isCorrect ? 'correct-text' : 'wrong-text'}`}>
      {isCorrect ? '✅ Correct!' : '❌ Wrong!'}
    </p>
  );
};

export default FeedbackMessage;
