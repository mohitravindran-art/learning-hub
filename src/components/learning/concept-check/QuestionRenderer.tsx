import React from 'react';
import type { ConceptCheckQuestion } from '../../../data/lessons/questionUnderstanding';
import SingleSelect from './questions/SingleSelect';
import TrueFalse from './questions/TrueFalse';
import Scenario from './questions/Scenario';
import MultiSelect from './questions/MultiSelect';
import Matching from './questions/Matching';
import Dropdown from './questions/Dropdown';
import Likert from './questions/Likert';
import OrderingQuestion from './questions/OrderingQuestion';
import ImageQuestion from './questions/ImageQuestion';

interface QuestionRendererProps {
  question: ConceptCheckQuestion;
  selectedAnswer: any;
  onSelect: (answer: any) => void;
  disabled?: boolean;
  onInlineRetry?: () => void;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({ question, selectedAnswer, onSelect, disabled, onInlineRetry }) => {
  switch (question.type) {
    case 'single-select':
      return <SingleSelect question={question} selectedAnswer={selectedAnswer} onSelect={onSelect} disabled={disabled} />;
    case 'multi-select':
      return <MultiSelect question={question} selectedAnswer={selectedAnswer} onSelect={onSelect} disabled={disabled} />;
    case 'true-false':
      return <TrueFalse question={question} selectedAnswer={selectedAnswer} onSelect={onSelect} disabled={disabled} />;
    case 'matching':
      return <Matching question={question} selectedAnswer={selectedAnswer} onSelect={onSelect} disabled={disabled} onInlineRetry={onInlineRetry} />;
    case 'dropdown':
      return <Dropdown question={question} selectedAnswer={selectedAnswer} onSelect={onSelect} disabled={disabled} />;
    case 'likert':
      return <Likert question={question} selectedAnswer={selectedAnswer} onSelect={onSelect} disabled={disabled} />;
    case 'scenario':
      return <Scenario question={question} selectedAnswer={selectedAnswer} onSelect={onSelect} disabled={disabled} />;
    case 'ordering':
      return <OrderingQuestion question={question} selectedAnswer={selectedAnswer} onSelect={onSelect} disabled={disabled} />;
    case 'image':
      return <ImageQuestion question={question} selectedAnswer={selectedAnswer} onSelect={onSelect} disabled={disabled} />;
    default:
      return <div>Unsupported question format: {question.type}</div>;
  }
};

export default QuestionRenderer;
