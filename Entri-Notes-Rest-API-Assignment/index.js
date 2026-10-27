
const express = require("express");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Register note routes
app.use("/api/notes", noteRoutes);

// Handle invalid JSON bodies
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      message: "Invalid JSON request body"
    });
  }

  next(err);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
