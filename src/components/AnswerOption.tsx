import React from 'react';

interface AnswerOptionProps {
  text: string;
  isSelected: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  disabled: boolean;
  onSelect: () => void;
}

const AnswerOption: React.FC<AnswerOptionProps> = ({
  text,
  isSelected,
  isCorrect,
  isWrong,
  disabled,
  onSelect
}) => {
  return (
    <button
      className={`option-btn 
        ${isSelected ? 'selected' : ''} 
        ${isCorrect ? 'correct' : ''} 
        ${isWrong ? 'wrong' : ''}`}
      onClick={onSelect}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default AnswerOption;
