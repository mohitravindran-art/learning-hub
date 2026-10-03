import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { SceneData } from '../../../data/lessons/questionUnderstanding';
import styles from './Scenes.module.css';
import { GripVertical, ArrowUp, ArrowDown } from 'lucide-react';

interface OrderingSceneProps {
  scene: SceneData;
  onComplete: () => void;
  onNext: () => void;
}

const OrderingScene: React.FC<OrderingSceneProps> = ({ scene, onComplete, onNext }) => {
  const { heading, body, items } = scene.content;
  const [currentOrder, setCurrentOrder] = useState<any[]>(items);
  const [isCorrect, setIsCorrect] = useState(false);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === currentOrder.length - 1)
    ) return;

    const newOrder = [...currentOrder];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newOrder[index], newOrder[swapIndex]] = [newOrder[swapIndex], newOrder[index]];
    
    setCurrentOrder(newOrder);
    
    // Check if sorted
    const isSorted = newOrder.every((item, i) => item.correctOrder === i + 1);
    if (isSorted) {
      setIsCorrect(true);
      onComplete();
    }
  };

  return (
    <div className={styles.sceneLayout}>
      <motion.div 
        className={styles.centerCard}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.heading}>{heading}</h2>
        {body && <p className={styles.subheading}>{body}</p>}

        <div className={styles.orderingContainer}>
          {currentOrder.map((item, index) => (
            <div key={item.id} className={styles.draggableItem} style={{ borderColor: isCorrect ? '#BBF7D0' : '#E2E8F0', background: isCorrect ? '#F0FDF4' : 'white' }}>
              <div className={styles.dragHandle}>
                <GripVertical size={20} />
              </div>
              <div style={{ flex: 1, fontWeight: 600, color: '#1E293B' }}>{item.text}</div>
              
              {!isCorrect && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => moveItem(index, 'up')}
                    disabled={index === 0}
                    style={{ background: 'transparent', border: 'none', cursor: index === 0 ? 'not-allowed' : 'pointer', color: '#94A3B8' }}
                  >
                    <ArrowUp size={20} />
                  </button>
                  <button 
                    onClick={() => moveItem(index, 'down')}
                    disabled={index === currentOrder.length - 1}
                    style={{ background: 'transparent', border: 'none', cursor: index === currentOrder.length - 1 ? 'not-allowed' : 'pointer', color: '#94A3B8' }}
                  >
                    <ArrowDown size={20} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.feedbackArea}>
          <div className={styles.feedbackText}>
            {isCorrect && "✓ Perfect! That's the correct order."}
          </div>
          {isCorrect && (
            <motion.button 
              className={styles.continueBtn}
              onClick={onNext}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue &rarr;
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default OrderingScene;
