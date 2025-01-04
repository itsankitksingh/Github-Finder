const axios = require('axios');

class GitHubService {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });
  }

  async getUserData(username) {
    try {
      const { data } = await this.api.get(`/users/${username}`);
      return {
        username: data.login,
        githubId: data.id.toString(),
        avatar_url: data.avatar_url,
        name: data.name,
        company: data.company,
        blog: data.blog,
        location: data.location,
        email: data.email,
        bio: data.bio,
        public_repos: data.public_repos,
        public_gists: data.public_gists,
        followers: data.followers,
        following: data.following,
        created_at: data.created_at
      };
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new Error('User not found');
      }
      throw new Error(`Failed to fetch user data: ${error.message}`);
    }
  }

  async getUserRepositories(username) {
    try {
      const { data } = await this.api.get(`/users/${username}/repos`);
      return data.map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        watchers_count: repo.watchers_count,
        forks_count: repo.forks_count,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        homepage: repo.homepage,
        private: repo.private
      }));
    } catch (error) {
      throw new Error(`Failed to fetch repositories: ${error.message}`);
    }
  }

  async getUserFollowers(username) {
    try {
      const { data } = await this.api.get(`/users/${username}/followers`);
      return data.map(follower => follower.login);
    } catch (error) {
      throw new Error(`Failed to fetch followers: ${error.message}`);
    }
  }

  async getUserFollowing(username) {
    try {
      const { data } = await this.api.get(`/users/${username}/following`);
      return data.map(following => following.login);
    } catch (error) {
      throw new Error(`Failed to fetch following: ${error.message}`);
    }
  }
}

module.exports = new GitHubService(); 