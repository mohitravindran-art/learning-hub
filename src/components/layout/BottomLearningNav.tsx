import React from 'react';
import { BookOpen, ClipboardList, Package, Book, BarChart2, Target } from 'lucide-react';
import clsx from 'clsx';
import styles from './BottomLearningNav.module.css';

interface BottomLearningNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  isSidebarOpen?: boolean;
}

const tabs = [
  { id: 'learn', label: 'Learn', icon: BookOpen },
  { id: 'practice', label: 'Practice', icon: Target },
  { id: 'assessments', label: 'Assessments', icon: ClipboardList },
  { id: 'resources', label: 'Resources', icon: Package },
  { id: 'flashcards', label: 'Flashcards', icon: Book },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
];

const BottomLearningNav: React.FC<BottomLearningNavProps> = ({ 
  activeTab, 
  onSelectTab,
  isSidebarOpen = false 
}) => {
  return (
    <div className={clsx(styles.navContainer, isSidebarOpen && styles.navContainerWithSidebar)}>
      <nav className={styles.nav}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeTab;
          
          return (
            <button
              key={tab.id}
              className={clsx(styles.tab, isActive && styles.activeTab)}
              onClick={() => onSelectTab(tab.id)}
            >
              <Icon size={20} className={styles.icon} />
              <span className={styles.label}>{tab.label}</span>
              {isActive && <div className={styles.activeIndicator} />}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomLearningNav;
