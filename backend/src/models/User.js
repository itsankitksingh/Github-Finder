const mongoose = require('mongoose');

const repositorySchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  html_url: String,
  language: String,
  stargazers_count: Number,
  watchers_count: Number,
  forks_count: Number,
  created_at: Date,
  updated_at: Date,
  homepage: String,
  private: Boolean
});

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  githubId: {
    type: String,
    required: true,
    unique: true
  },
  avatar_url: String,
  name: String,
  company: String,
  blog: String,
  location: String,
  email: String,
  bio: String,
  public_repos: Number,
  public_gists: Number,
  followers: Number,
  following: Number,
  created_at: Date,
  updated_at: Date,
  followers_list: [{
    type: String,
    ref: 'User'
  }],
  following_list: [{
    type: String,
    ref: 'User'
  }],
  repositories: [repositorySchema],
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema); 