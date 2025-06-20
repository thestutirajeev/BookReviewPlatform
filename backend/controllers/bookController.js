const Book = require('../models/Book');

const getAllBooks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const search = req.query.search ? req.query.search.toLowerCase() : '';
  const category = req.query.category ? req.query.category.toLowerCase() : '';

  const query = {
    $and: [
      {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { author: { $regex: search, $options: 'i' } }
        ],
      },
      category ? { genre: { $regex: category, $options: 'i' } } : {},
    ],
  };

  const books = await Book.find(query).skip(skip).limit(limit);
  const count = await Book.countDocuments(query);
  res.json({
    books,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
};

const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
};

const createBook = async (req, res) => {
  const { title, author, description, genre, coverImage } = req.body;
  const book = new Book({ title, author, description, genre, coverImage });
  await book.save();
  res.status(201).json(book);
};

module.exports = { getAllBooks, getBookById, createBook };
