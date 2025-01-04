import React from 'react';
import './RepositoryList.css';

const RepositoryList = ({ repositories, onRepoClick }) => {
  if (!repositories?.length) {
    return <div className="no-repos">No repositories found</div>;
  }

  return (
    <div className="repository-list">
      {repositories.map(repo => (
        <div key={repo.id} className="repository-item" onClick={() => onRepoClick(repo)}>
          <div className="repo-header">
            <h3 className="repo-name">{repo.name}</h3>
            {repo.language && <span className="repo-language">{repo.language}</span>}
          </div>
          {repo.description && <p className="repo-description">{repo.description}</p>}
          <div className="repo-stats">
            <span>⭐ {repo.stargazers_count}</span>
            <span>🔄 {repo.forks_count}</span>
            <span>👀 {repo.watchers_count}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RepositoryList; 