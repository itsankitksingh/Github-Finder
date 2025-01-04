import React from 'react';
import './RepositoryDetails.css';

const RepositoryDetails = ({ repository, onBack }) => {
  if (!repository) return null;

  return (
    <div className="repository-details">
      <button className="back-button" onClick={onBack}>← Back to repositories</button>
      
      <div className="repo-detail-header">
        <h2>{repository.name}</h2>
        {repository.private && <span className="private-badge">Private</span>}
      </div>

      {repository.description && (
        <p className="repo-detail-description">{repository.description}</p>
      )}

      <div className="repo-detail-info">
        <div className="info-item">
          <span className="label">Language:</span>
          <span>{repository.language || 'Not specified'}</span>
        </div>
        
        <div className="info-item">
          <span className="label">Created:</span>
          <span>{new Date(repository.created_at).toLocaleDateString()}</span>
        </div>
        
        <div className="info-item">
          <span className="label">Last updated:</span>
          <span>{new Date(repository.updated_at).toLocaleDateString()}</span>
        </div>

        <div className="repo-stats-detailed">
          <div className="stat-item">
            <span className="stat-value">{repository.stargazers_count}</span>
            <span className="stat-label">Stars</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{repository.forks_count}</span>
            <span className="stat-label">Forks</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{repository.watchers_count}</span>
            <span className="stat-label">Watchers</span>
          </div>
        </div>
      </div>

      <div className="repo-links">
        <a 
          href={repository.html_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="repo-link"
        >
          View on GitHub
        </a>
        {repository.homepage && (
          <a 
            href={repository.homepage} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="repo-link"
          >
            Visit Homepage
          </a>
        )}
      </div>
    </div>
  );
};

export default RepositoryDetails; 