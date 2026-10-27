
let notes = [
  {
    id: 1,
    title: "Study Node.js",
    content: "Learn Express and REST APIs",
    category: "Education"
  },
  {
    id: 2,
    title: "Buy groceries",
    content: "Buy milk, bread, and eggs",
    category: "Personal"
  },
  {
    id: 3,
    title: "Complete assignment",
    content: "Finish the Notes REST API project",
    category: "Work"
  }
];

// GET /api/notes
const getAllNotes = (req, res) => {
  res.status(200).json(notes);
};

// GET /api/notes/:id
const getNoteById = (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);

  if (!note) {
    return res.status(404).json({
      message: "Note not found"
    });
  }

  res.status(200).json(note);
};

// POST /api/notes
const createNote = (req, res) => {
  const { title, content, category } = req.body;

  if (
    typeof title !== "string" || !title.trim() ||
    typeof content !== "string" || !content.trim() ||
    typeof category !== "string" || !category.trim()
  ) {
    return res.status(400).json({
      message: "Title, content, and category are required"
    });
  }

  // Use Date.now() and avoid ID collisions.
  let id = Date.now();
  while (notes.some((note) => note.id === id)) {
    id++;
  }

  const newNote = {
    id,
    title: title.trim(),
    content: content.trim(),
    category: category.trim()
  };

  notes.push(newNote);

  res.status(201).json(newNote);
};

// PUT /api/notes/:id
const updateNote = (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);

  if (!note) {
    return res.status(404).json({
      message: "Note not found"
    });
  }

  const { title, content, category } = req.body;

  for (const field of ["title", "content", "category"]) {
    if (req.body[field] !== undefined) {
      if (
        typeof req.body[field] !== "string" ||
        !req.body[field].trim()
      ) {
        return res.status(400).json({
          message: `${field} must be a non-empty string`
        });
      }
    }
  }

  if (title !== undefined) note.title = title.trim();
  if (content !== undefined) note.content = content.trim();
  if (category !== undefined) note.category = category.trim();

  res.status(200).json(note);
};

// DELETE /api/notes/:id
const deleteNote = (req, res) => {
  const id = Number(req.params.id);
  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Note not found"
    });
  }

  const deletedNote = notes.splice(index, 1)[0];

  res.status(200).json({
    message: "Note deleted successfully",
    note: deletedNote
  });
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
};
