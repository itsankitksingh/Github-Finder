import React, { useState } from 'react';
import { searchUsers, getSortedUsers } from '../services/api';
import './UserSearch.css';

const UserSearch = ({ onUserSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const results = await searchUsers(searchQuery.trim());
      setUsers(results);
    } catch (error) {
      setError(error.message || 'Search failed');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = async (e) => {
    const value = e.target.value;
    setSortBy(value);
    if (value) {
      setLoading(true);
      setError(null);
      try {
        const sortedUsers = await getSortedUsers(value);
        setUsers(sortedUsers);
      } catch (error) {
        setError(error.message || 'Sorting failed');
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="user-search">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search users by username or location"
        />
        <button type="submit">Search</button>
      </form>

      <div className="sort-section">
        <select value={sortBy} onChange={handleSort}>
          <option value="">Sort by...</option>
          <option value="public_repos">Public Repos</option>
          <option value="public_gists">Public Gists</option>
          <option value="followers">Followers</option>
          <option value="following">Following</option>
          <option value="created_at">Created At</option>
        </select>
      </div>

      {error && (
        <div className="search-error">{error}</div>
      )}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="users-list">
          {users.length === 0 ? (
            <p className="no-results">No users found</p>
          ) : (
            users.map(user => (
              <div key={user.username} className="user-item" onClick={() => onUserSelect(user)}>
                <img src={user.avatar_url} alt={user.username} className="user-avatar" />
                <div className="user-info">
                  <h3>{user.username}</h3>
                  {user.location && <p>{user.location}</p>}
                  {user.bio && <p className="user-bio">{user.bio}</p>}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default UserSearch; 