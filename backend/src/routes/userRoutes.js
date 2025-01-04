const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/users/search', userController.searchUsers);
router.get('/users/:username', userController.saveUser);
router.get('/users/:username/friends', userController.getFriends);
router.delete('/users/:username', userController.softDeleteUser);
router.patch('/users/:username', userController.updateUser);
router.get('/users', userController.getSortedUsers);

module.exports = router; 