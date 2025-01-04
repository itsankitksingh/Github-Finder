import React, { useState } from 'react';
import { updateUser, deleteUser } from '../services/api';
import './UserManagement.css';

const UserManagement = ({ user, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    location: user.location || '',
    blog: user.blog || '',
    bio: user.bio || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser(user.username, formData);
      onUpdate(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(user.username);
        onDelete();
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  return (
    <div className="user-management">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Blog:</label>
            <input
              type="text"
              name="blog"
              value={formData.blog}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Bio:</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>
          <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className="management-buttons">
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          <button onClick={handleDelete} className="delete-button">Delete User</button>
        </div>
      )}
    </div>
  );
};

export default UserManagement; 