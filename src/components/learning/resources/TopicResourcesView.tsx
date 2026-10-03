import React, { useState, useMemo } from 'react';
import { Search, FileText, BookOpen, ExternalLink, Video, LayoutTemplate, X, Download, ArrowRight } from 'lucide-react';
import { topicResourcesData, type TopicResource } from '../../../data/topicResourcesData';
import styles from './TopicResourcesView.module.css';

interface TopicResourcesViewProps {
  topicId?: string;
}

const TopicResourcesView: React.FC<TopicResourcesViewProps> = ({ topicId = "topic-1" }) => {
  const allResources: TopicResource[] = useMemo(() => {
    return topicResourcesData[topicId] || topicResourcesData["topic-1"];
  }, [topicId]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewResource, setPreviewResource] = useState<TopicResource | null>(null);

  const categories = ['All', 'PDF Guides', 'Documents', 'Articles', 'Videos', 'Templates'];

  const filteredResources = useMemo(() => {
    return allResources.filter(res => {
      const matchesSearch = !searchQuery.trim() || 
        res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesCat = true;
      if (selectedCategory === 'PDF Guides') matchesCat = res.type === 'pdf';
      else if (selectedCategory === 'Documents') matchesCat = res.type === 'document';
      else if (selectedCategory === 'Articles') matchesCat = res.type === 'article';
      else if (selectedCategory === 'Videos') matchesCat = res.type === 'video';
      else if (selectedCategory === 'Templates') matchesCat = res.type === 'template';

      return matchesSearch && matchesCat;
    });
  }, [allResources, searchQuery, selectedCategory]);

  const getResourceIcon = (type: TopicResource['type']) => {
    switch (type) {
      case 'pdf':
        return <FileText size={22} />;
      case 'document':
        return <BookOpen size={22} />;
      case 'article':
        return <ExternalLink size={22} />;
      case 'video':
        return <Video size={22} />;
      case 'template':
        return <LayoutTemplate size={22} />;
      default:
        return <FileText size={22} />;
    }
  };

  const getIconClass = (type: TopicResource['type']) => {
    switch (type) {
      case 'pdf':
        return styles.iconPdf;
      case 'document':
        return styles.iconDoc;
      case 'article':
        return styles.iconArticle;
      case 'video':
        return styles.iconVideo;
      case 'template':
        return styles.iconTemplate;
      default:
        return styles.iconDoc;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        {/* 1. Header: Topic Resources + Search */}
        <div className={styles.headerBar}>
          <h1 className={styles.pageTitle}>Topic Resources</h1>
          <div className={styles.searchWrapper}>
            <Search size={18} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search resources..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* 2. Category Filter Pills */}
        <div className={styles.filterRow}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`${styles.filterPill} ${selectedCategory === cat ? styles.filterPillActive : ''}`}
              onClick={() => setSelectedCategory(cat)}
              type="button"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3. Resources Responsive Grid */}
        {filteredResources.length > 0 ? (
          <div className={styles.resourcesGrid}>
            {filteredResources.map(res => (
              <div 
                key={res.id} 
                className={styles.resourceCard}
                onClick={() => setPreviewResource(res)}
                style={{ cursor: 'pointer' }}
              >
                <div>
                  <div className={styles.cardTop}>
                    <div className={`${styles.iconWrapper} ${getIconClass(res.type)}`}>
                      {getResourceIcon(res.type)}
                    </div>
                    <span className={styles.typeBadge}>{res.typeLabel}</span>
                  </div>

                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{res.title}</h3>
                    <p className={styles.cardDesc}>{res.description}</p>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.metaText}>{res.meta}</span>
                  <button 
                    className={styles.actionLink}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewResource(res);
                    }}
                    type="button"
                  >
                    <span>{res.actionText}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <Search size={36} strokeWidth={1.5} color="#94A3B8" />
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>No resources found</div>
            <p style={{ margin: 0, fontSize: '14px' }}>
              No resources matched "{searchQuery}". Try a different keyword or switch categories.
            </p>
            <button 
              className={styles.filterPill} 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              style={{ marginTop: '8px' }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* 4. Preview Modal */}
      {previewResource && (
        <div className={styles.modalBackdrop} onClick={() => setPreviewResource(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.modalCloseBtn}
              onClick={() => setPreviewResource(null)}
              type="button"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <div className={`${styles.iconWrapper} ${getIconClass(previewResource.type)}`}>
                {getResourceIcon(previewResource.type)}
              </div>
              <div>
                <span className={styles.typeBadge}>{previewResource.typeLabel}</span>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: '4px 0 0 0' }}>
                  {previewResource.title}
                </h2>
              </div>
            </div>

            <p style={{ fontSize: '14.5px', color: '#334155', lineHeight: 1.6, marginBottom: '20px' }}>
              {previewResource.description}
            </p>

            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                Resource Details
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13.5px', color: '#0F172A' }}>
                <div><strong>Format:</strong> {previewResource.meta}</div>
                <div><strong>Topic:</strong> Question Understanding (1.2)</div>
                <div><strong>Access:</strong> Free Student Resource</div>
                <div><strong>Status:</strong> Verified Guide</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                style={{
                  background: '#F1F5F9',
                  border: '1.5px solid #E2E8F0',
                  color: '#475569',
                  padding: '10px 20px',
                  borderRadius: '999px',
                  fontWeight: 700,
                  fontSize: '13.5px',
                  cursor: 'pointer'
                }}
                onClick={() => setPreviewResource(null)}
                type="button"
              >
                Close
              </button>

              <button
                style={{
                  background: '#2563EB',
                  border: 'none',
                  color: '#FFFFFF',
                  padding: '10px 24px',
                  borderRadius: '999px',
                  fontWeight: 700,
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                }}
                onClick={() => {
                  alert(`Downloading / opening ${previewResource.title}`);
                  setPreviewResource(null);
                }}
                type="button"
              >
                <Download size={16} /> Open & Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicResourcesView;
