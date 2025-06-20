const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  registerUser,
  loginUser,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', protect, getUserProfile);
router.put('/:id', protect, updateUserProfile);

module.exports = router;
