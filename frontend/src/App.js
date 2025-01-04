import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import UserInfo from './components/UserInfo';
import RepositoryList from './components/RepositoryList';
import RepositoryDetails from './components/RepositoryDetails';
import UserManagement from './components/UserManagement';
import UserSearch from './components/UserSearch';
import UserFriends from './components/UserFriends';
import { fetchUserData, fetchUserRepositories } from './services/api';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [repositories, setRepositories] = useState(null);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showFriends, setShowFriends] = useState(false);

  const handleSearch = async (username) => {
    setLoading(true);
    setError(null);
    setShowSearch(false);
    setShowFriends(false);
    
    try {
      const userData = await fetchUserData(username);
      const reposData = await fetchUserRepositories(username);
      
      setUser(userData);
      setRepositories(reposData);
      setSelectedRepo(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch user data. Please try again.');
      setUser(null);
      setRepositories(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRepoClick = (repo) => {
    setSelectedRepo(repo);
    setShowSearch(false);
    setShowFriends(false);
  };

  const handleBack = () => {
    setSelectedRepo(null);
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleUserDelete = () => {
    setUser(null);
    setRepositories(null);
    setSelectedRepo(null);
    setShowSearch(false);
    setShowFriends(false);
  };

  const handleUserSelect = (selectedUser) => {
    handleSearch(selectedUser.username);
  };

  const handleFriendSelect = (friendUsername) => {
    handleSearch(friendUsername);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    setShowFriends(false);
    setSelectedRepo(null);
  };

  const toggleFriends = () => {
    setShowFriends(!showFriends);
    setShowSearch(false);
    setSelectedRepo(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>GitHub Explorer</h1>
        <div className="header-content">
          <div className="search-section">
            <SearchBar onSearch={handleSearch} />
            <button onClick={toggleSearch} className="search-users-btn">
              {showSearch ? 'Hide Search' : 'Search Users'}
            </button>
          </div>
          {user && (
            <div className="user-actions">
              <button onClick={toggleFriends}>
                {showFriends ? 'Hide Friends' : 'View Friends'}
              </button>
            </div>
          )}
        </div>
      </header>

      {loading && (
        <div className="loading">Loading...</div>
      )}

      {error && (
        <div className="error">{error}</div>
      )}

      {showSearch && !loading && (
        <UserSearch onUserSelect={handleUserSelect} />
      )}

      {!loading && !error && user && !showSearch && (
        <>
          <UserInfo user={user} />
          <UserManagement 
            user={user} 
            onUpdate={handleUserUpdate} 
            onDelete={handleUserDelete}
          />
          
          {showFriends ? (
            <UserFriends 
              username={user.username} 
              onFriendSelect={handleFriendSelect} 
            />
          ) : selectedRepo ? (
            <RepositoryDetails 
              repository={selectedRepo} 
              onBack={handleBack} 
            />
          ) : (
            <RepositoryList 
              repositories={repositories} 
              onRepoClick={handleRepoClick} 
            />
          )}
        </>
      )}
    </div>
  );
}

export default App; 