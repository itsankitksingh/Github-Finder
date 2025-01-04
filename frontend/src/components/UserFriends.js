import React, { useState, useEffect } from 'react';
import { getUserFriends } from '../services/api';
import './UserFriends.css';

const UserFriends = ({ username, onFriendSelect }) => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friendsList = await getUserFriends(username);
        setFriends(friendsList);
      } catch (err) {
        setError('Failed to load friends');
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [username]);

  if (loading) return <div className="loading">Loading friends...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="friends-list">
      <h2>Mutual Followers</h2>
      {friends.length === 0 ? (
        <p>No mutual followers found</p>
      ) : (
        friends.map(friend => (
          <div
            key={friend}
            className="friend-item"
            onClick={() => onFriendSelect(friend)}
          >
            <span className="friend-username">{friend}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default UserFriends; 