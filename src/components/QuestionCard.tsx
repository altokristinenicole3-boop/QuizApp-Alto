import React from 'react';
import AnswerOption from './AnswerOption';
import FeedbackMessage from './FeedbackMessage';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  isAnswered: boolean;
  onSelect: (index: number) => void;
  onNext: () => void;
  onCheck: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  isAnswered,
  onSelect,
  onNext,
  onCheck
}) => {
  return (
    <div className="question-card">
      <h2 className="question-text">{question.question}</h2>

      <div className="options-container">
        {question.options.map((option, index) => (
          <AnswerOption
            key={index}
            text={option}
            isSelected={selectedAnswer === index && !isAnswered}
            isCorrect={isAnswered && index === question.correct}
            isWrong={isAnswered && selectedAnswer === index && selectedAnswer !== question.correct}
            disabled={isAnswered}
            onSelect={() => onSelect(index)}
          />
        ))}
      </div>

      {isAnswered && selectedAnswer !== null && (
        <FeedbackMessage isCorrect={selectedAnswer === question.correct} />
      )}

      <div className="button-group">
        {!isAnswered ? (
          <button
            className="check-btn"
            onClick={onCheck}
            disabled={selectedAnswer === null}
          >
            Check Answer
          </button>
        ) : (
          <button className="next-btn" onClick={onNext}>
            Next →
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
