import React from 'react';
import type { ConceptCheckQuestion } from '../../../../data/lessons/questionUnderstanding';
import styles from './QuestionStyles.module.css';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface OrderingQuestionProps {
  question: ConceptCheckQuestion;
  selectedAnswer: any[];
  onSelect: (answer: any[]) => void;
  disabled?: boolean;
}

const OrderingQuestion: React.FC<OrderingQuestionProps> = ({ question, selectedAnswer, onSelect, disabled }) => {
  const currentIds: string[] = (selectedAnswer && selectedAnswer.length > 0)
    ? selectedAnswer 
    : (question.options?.map(o => o.id) || []);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (disabled) return;
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === currentIds.length - 1)
    ) return;

    const newOrder = [...currentIds];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newOrder[index], newOrder[swapIndex]] = [newOrder[swapIndex], newOrder[index]];
    
    onSelect(newOrder);
  };

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {currentIds.map((optId, index) => {
          const opt = question.options?.find(o => o.id === optId);
          if (!opt) return null;

          return (
            <div key={opt.id} className={styles.orderItem} style={{ padding: '10px 14px', borderRadius: '10px' }}>
              <div className={styles.orderNum} style={{ width: '28px', height: '28px', fontSize: '13px' }}>
                {index + 1}
              </div>
              <div style={{ flex: 1, fontSize: '14px', fontWeight: 500, color: '#1E293B' }}>
                {opt.text}
              </div>
              {!disabled && (
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button 
                    type="button"
                    onClick={() => moveItem(index, 'up')} 
                    disabled={index === 0}
                    style={{
                      background: index === 0 ? '#F1F5F9' : '#EFF6FF',
                      border: '1px solid #CBD5E1',
                      borderRadius: '6px',
                      padding: '4px 8px',
                      cursor: index === 0 ? 'not-allowed' : 'pointer',
                      color: index === 0 ? '#94A3B8' : '#2563EB',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    title="Move Up"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button 
                    type="button"
                    onClick={() => moveItem(index, 'down')} 
                    disabled={index === currentIds.length - 1}
                    style={{
                      background: index === currentIds.length - 1 ? '#F1F5F9' : '#EFF6FF',
                      border: '1px solid #CBD5E1',
                      borderRadius: '6px',
                      padding: '4px 8px',
                      cursor: index === currentIds.length - 1 ? 'not-allowed' : 'pointer',
                      color: index === currentIds.length - 1 ? '#94A3B8' : '#2563EB',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    title="Move Down"
                  >
                    <ArrowDown size={14} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderingQuestion;
