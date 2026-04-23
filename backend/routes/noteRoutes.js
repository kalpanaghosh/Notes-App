const express = require("express");
const router = express.Router();
const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

// GET /notes - Fetch all notes
router.get("/", getAllNotes);

// GET /notes/:id - Fetch a single note
router.get("/:id", getNoteById);

// POST /notes - Create a new note
router.post("/", createNote);

// PUT /notes/:id - Update a note
router.put("/:id", updateNote);

// DELETE /notes/:id - Delete a note
router.delete("/:id", deleteNote);

module.exports = router;
