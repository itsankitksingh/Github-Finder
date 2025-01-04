const User = require('../models/User');
const githubService = require('../services/githubService');

class UserController {
  async saveUser(req, res) {
    try {
      const { username } = req.params;
      
      // Convert username to lowercase for case-insensitive search
      const lowercaseUsername = username.toLowerCase();
      
      // First, try to find the user in our database
      let user = await User.findOne({ 
        username: new RegExp(`^${lowercaseUsername}$`, 'i'),
        isDeleted: false 
      });
      
      if (user) {
        // If user exists in database, return it with repositories
        return res.json({
          ...user.toObject(),
          repositories: user.repositories || []
        });
      }

      // If user not found in database, fetch from GitHub
      try {
        const [githubData, repositories, followers, following] = await Promise.all([
          githubService.getUserData(username),
          githubService.getUserRepositories(username),
          githubService.getUserFollowers(username),
          githubService.getUserFollowing(username)
        ]);

        // Create new user with repositories
        user = new User({
          ...githubData,
          followers_list: followers,
          following_list: following,
          repositories: repositories
        });

        // Save to database
        await user.save();
        return res.json({
          ...user.toObject(),
          repositories: repositories
        });

      } catch (githubError) {
        console.error('GitHub API Error:', githubError);
        if (githubError.message === 'User not found') {
          return res.status(404).json({ error: 'GitHub user not found' });
        }
        return res.status(500).json({ error: 'Failed to fetch data from GitHub' });
      }
    } catch (error) {
      console.error('Server Error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getFriends(req, res) {
    try {
      const { username } = req.params;
      const user = await User.findOne({ username, isDeleted: false });
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const friends = user.followers_list.filter(follower => 
        user.following_list.includes(follower)
      );

      res.json(friends);
    } catch (error) {
      console.error('Server Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async searchUsers(req, res) {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
      }

      const users = await User.find({
        isDeleted: false,
        $or: [
          { username: new RegExp(query, 'i') },
          { location: new RegExp(query, 'i') }
        ]
      }).select('username avatar_url location bio'); // Only select necessary fields

      res.json(users);
    } catch (error) {
      console.error('Search Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async softDeleteUser(req, res) {
    try {
      const { username } = req.params;
      const user = await User.findOneAndUpdate(
        { username },
        { isDeleted: true },
        { new: true }
      );
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Server Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateUser(req, res) {
    try {
      const { username } = req.params;
      const updates = req.body;
      
      const allowedUpdates = ['location', 'blog', 'bio'];
      const filteredUpdates = Object.keys(updates)
        .filter(key => allowedUpdates.includes(key))
        .reduce((obj, key) => {
          obj[key] = updates[key];
          return obj;
        }, {});

      const user = await User.findOneAndUpdate(
        { username, isDeleted: false },
        filteredUpdates,
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error('Server Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getSortedUsers(req, res) {
    try {
      const { sortBy } = req.query;
      const allowedSortFields = [
        'public_repos',
        'public_gists',
        'followers',
        'following',
        'created_at'
      ];

      if (!allowedSortFields.includes(sortBy)) {
        return res.status(400).json({ error: 'Invalid sort field' });
      }

      const users = await User.find({ isDeleted: false })
        .sort({ [sortBy]: -1 });

      res.json(users);
    } catch (error) {
      console.error('Server Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new UserController(); 