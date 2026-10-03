import React, { useState } from 'react';
import styles from './Tabs.module.css';
import resourceStyles from './ResourcesTab.module.css';
import { Search, FileText, Video, LayoutTemplate, FileImage } from 'lucide-react';

interface TabProps {
  activeTopicId: string;
}

const mockResources = [
  { id: 1, title: 'Interview Question Bank', description: 'A comprehensive list of common behavioral interview questions.', type: 'PDF', size: '2.4 MB', category: 'Articles', icon: FileText },
  { id: 2, title: 'Communication Frameworks', description: 'Learn how to structure your answers effectively using proven frameworks.', type: 'Article', size: '5 min read', category: 'Articles', icon: FileText },
  { id: 3, title: 'Body Language Guide', description: 'Master non-verbal communication in high-stakes environments.', type: 'Video', size: '12 Min', category: 'Videos', icon: Video },
  { id: 4, title: 'STAR Method Template', description: 'Use this template to prepare your situational answers.', type: 'Template', size: '1.1 MB', category: 'Templates', icon: LayoutTemplate },
  { id: 5, title: 'Active Listening Flow', description: 'Visual guide to demonstrating active listening.', type: 'Infographic', size: '3.2 MB', category: 'Infographics', icon: FileImage },
];

const categories = ['All', 'Articles', 'Videos', 'Templates', 'Infographics'];

const ResourcesTab: React.FC<TabProps> = ({ activeTopicId: _activeTopicId }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = mockResources.filter(resource => {
    const matchesCategory = activeCategory === 'All' || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.tabContainer}>
      <h2 className={styles.header}>Topic Resources</h2>
      <p className={styles.supportingText}>Access helpful materials to support your learning.</p>

      <div className={resourceStyles.container}>
        <div className={resourceStyles.searchBar}>
          <Search size={20} color="var(--text-secondary)" />
          <input 
            type="text" 
            placeholder="Search resources..." 
            className={resourceStyles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={resourceStyles.filters}>
          {categories.map(category => (
            <button 
              key={category}
              className={`${resourceStyles.filterBtn} ${activeCategory === category ? resourceStyles.active : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={resourceStyles.resourcesGrid}>
          {filteredResources.map(resource => {
            const Icon = resource.icon;
            return (
              <div key={resource.id} className={resourceStyles.card}>
                <div className={resourceStyles.cardHeader}>
                  <div className={resourceStyles.iconWrapper}>
                    <Icon size={24} />
                  </div>
                  <div className={resourceStyles.cardTitle}>{resource.title}</div>
                </div>
                <div className={resourceStyles.cardDescription}>{resource.description}</div>
                <div className={resourceStyles.cardFooter}>
                  <span>{resource.type}</span>
                  <span>{resource.size}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResourcesTab;
