import React from 'react';
import { motion } from 'framer-motion';
import styles from './Elements.module.css';

interface AvatarProps {
  src: string;
  position?: 'left' | 'right' | 'center';
  delay?: number;
}

const Avatar: React.FC<AvatarProps> = ({ src, position = 'left', delay = 0 }) => {
  const getAvatarUrl = (asset: string) => {
    return new URL(`../../../assets/learning-hub/${asset}`, import.meta.url).href;
  };

  const getPositionStyles = () => {
    switch (position) {
      case 'left': return { left: '10%', bottom: '-5%' };
      case 'right': return { right: '10%', bottom: '-5%' };
      case 'center': return { left: '50%', transform: 'translateX(-50%)', bottom: '-5%' };
    }
  };

  const initialX = position === 'right' ? 50 : position === 'left' ? -50 : 0;
  const initialY = position === 'center' ? 50 : 0;

  return (
    <motion.img
      src={getAvatarUrl(src)}
      alt="Coach Avatar"
      className={styles.avatarImage}
      style={getPositionStyles()}
      initial={{ opacity: 0, x: initialX, y: initialY }}
      animate={{ opacity: 1, x: position === 'center' ? '-50%' : 0, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    />
  );
};

export default Avatar;
