const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
} = require('../controllers/bookController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', protect, isAdmin, createBook);

module.exports = router;
