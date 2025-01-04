const API_BASE_URL = 'https://github-finder-backend.onrender.com/api';

export const fetchUserData = async (username) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${username}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch user data');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const fetchUserRepositories = async (username) => {
  try {
    const userData = await fetchUserData(username);
    return userData.repositories || [];
  } catch (error) {
    console.error('Repository Error:', error);
    throw error;
  }
};

export const getUserFriends = async (username) => {
  const response = await fetch(`${API_BASE_URL}/users/${username}/friends`);
  if (!response.ok) {
    throw new Error('Failed to fetch user friends');
  }
  return response.json();
};

export const searchUsers = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/search?query=${encodeURIComponent(query)}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to search users');
    }
    
    return data;
  } catch (error) {
    console.error('Search API Error:', error);
    throw error;
  }
};

export const deleteUser = async (username) => {
  const response = await fetch(`${API_BASE_URL}/users/${username}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
  return response.json();
};

export const updateUser = async (username, updates) => {
  const response = await fetch(`${API_BASE_URL}/users/${username}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error('Failed to update user');
  }
  return response.json();
};

export const getSortedUsers = async (sortBy) => {
  const response = await fetch(`${API_BASE_URL}/users?sortBy=${sortBy}`);
  if (!response.ok) {
    throw new Error('Failed to fetch sorted users');
  }
  return response.json();
}; 