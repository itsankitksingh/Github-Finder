import React from 'react';
import './UserInfo.css';

const UserInfo = ({ user }) => {
  if (!user) return null;

  return (
    <div className="user-info">
      <div className="user-header">
        <img src={user.avatar_url} alt={user.username} className="avatar" />
        <div className="user-details">
          <h2>{user.name || user.username}</h2>
          {user.bio && <p className="bio">{user.bio}</p>}
          <div className="stats">
            <span>Repositories: {user.public_repos}</span>
            <span>Followers: {user.followers}</span>
            <span>Following: {user.following}</span>
          </div>
          {user.location && <p className="location">{user.location}</p>}
          {user.blog && (
            <a href={user.blog} target="_blank" rel="noopener noreferrer" className="blog-link">
              {user.blog}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo; 