
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const Note = require('./models/Note');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Return a useful status code and error message.
function handleError(res, error) {
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation failed',
      error: error.message
    });
  }

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(404).json({
      message: 'Note not found'
    });
  }

  console.error(error);

  return res.status(500).json({
    message: 'Internal server error'
  });
}

// 1. GET /api/notes
// Retrieve all notes, optionally filtered by category.
app.get('/api/notes', async (req, res) => {
  try {
    const filter = {};

    if (req.query.category !== undefined) {
      const allowedCategories = [
        'General',
        'Work',
        'Personal',
        'Ideas'
      ];

      if (!allowedCategories.includes(req.query.category)) {
        return res.status(400).json({
          message: 'Invalid category'
        });
      }

      filter.category = req.query.category;
    }

    const notes = await Note.find(filter);
    res.status(200).json(notes);
  } catch (error) {
    handleError(res, error);
  }
});

// 2. GET /api/notes/:id
// Retrieve a single note by ID.
app.get('/api/notes/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: 'Note not found'
      });
    }

    res.status(200).json(note);
  } catch (error) {
    handleError(res, error);
  }
});

// 3. POST /api/notes
// Create a new note.
app.post('/api/notes', async (req, res) => {
  try {
    const { title, content, category } = req.body;

    if (
      typeof title !== 'string' ||
      !title.trim() ||
      typeof content !== 'string' ||
      !content.trim()
    ) {
      return res.status(400).json({
        message: 'Title and content are required'
      });
    }

    const note = new Note({
      title,
      content,
      ...(category !== undefined && { category })
    });

    const savedNote = await note.save();

    res.status(201).json(savedNote);
  } catch (error) {
    handleError(res, error);
  }
});

// 4. PUT /api/notes/:id
// Update an existing note.
app.put('/api/notes/:id', async (req, res) => {
  try {
    const { title, content, category } = req.body;

    if (
      (title !== undefined &&
        (typeof title !== 'string' || !title.trim())) ||
      (content !== undefined &&
        (typeof content !== 'string' || !content.trim()))
    ) {
      return res.status(400).json({
        message: 'Title and content must not be empty'
      });
    }

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
        context: 'query'
      }
    );

    if (!note) {
      return res.status(404).json({
        message: 'Note not found'
      });
    }

    res.status(200).json(note);
  } catch (error) {
    handleError(res, error);
  }
});

// 5. DELETE /api/notes/:id
// Delete a note by ID.
app.delete('/api/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: 'Note not found'
      });
    }

    res.status(200).json({
      message: 'Note deleted successfully',
      note
    });
  } catch (error) {
    handleError(res, error);
  }
});

// Connect to MongoDB before accepting requests.
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('MongoDB connected successfully');

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

startServer();
