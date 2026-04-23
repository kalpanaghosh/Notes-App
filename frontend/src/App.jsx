import { useEffect, useState } from "react";
import axios from "axios";
import NoteForm from "./components/NoteForm";
import NoteItem from "./components/NoteItem";
import NoteModal from "./components/NoteModal";

const API_URL = "http://localhost:5000/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [viewingNote, setViewingNote] = useState(null);

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setNotes(res.data.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch notes. Is the backend running?");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Show success message temporarily
  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // Add a new note
  const addNote = async (note) => {
    try {
      const res = await axios.post(API_URL, note);
      setNotes([res.data.data, ...notes]);
      showSuccess("Note created successfully! ✨");
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create note");
    }
  };

  // Update a note
  const updateNote = async (id, updatedData) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, updatedData);
      setNotes(
        notes.map((note) => (note._id === id ? res.data.data : note))
      );
      setEditingNote(null);
      showSuccess("Note updated successfully! ✏️");
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update note");
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
      if (viewingNote && viewingNote._id === id) setViewingNote(null);
      showSuccess("Note deleted! 🗑️");
      setError(null);
    } catch (err) {
      setError("Failed to delete note");
    }
  };

  // View a note (fetch from backend)
  const viewNote = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      setViewingNote(res.data.data);
    } catch (err) {
      setError("Failed to fetch note details");
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Inspire Notes</h1>
        <p>Capture your thoughts and ideas in style</p>
      </header>

      <main className="main-content">
        {/* Notifications */}
        {error && <div className="toast toast-error">{error}</div>}
        {successMsg && <div className="toast toast-success">{successMsg}</div>}

        <div className="content-grid">
          <section className="form-section">
            <div className="glass-panel">
              <h2>{editingNote ? "Edit Note" : "Create New Note"}</h2>
              <NoteForm
                onSubmit={editingNote ? (data) => updateNote(editingNote._id, data) : addNote}
                initialData={editingNote}
                onCancel={editingNote ? () => setEditingNote(null) : null}
              />
            </div>
          </section>

          <section className="notes-section">
            <div className="notes-header">
              <h2>Your Notes</h2>
              <span className="badge">{notes.length} saved</span>
            </div>

            {loading ? (
              <div className="loader-container">
                <div className="spinner"></div>
                <p>Loading your ideas...</p>
              </div>
            ) : notes.length === 0 ? (
              <div className="empty-state glass-panel">
                <div className="empty-icon">📝</div>
                <h3>No notes yet</h3>
                <p>Start typing on the left to capture your first brilliant idea.</p>
              </div>
            ) : (
              <div className="notes-grid">
                {notes.map((note) => (
                  <NoteItem
                    key={note._id}
                    note={note}
                    onDelete={deleteNote}
                    onEdit={() => setEditingNote(note)}
                    onView={viewNote}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with MERN Stack • Minimalist aesthetics</p>
      </footer>

      {viewingNote && (
        <NoteModal 
          note={viewingNote} 
          onClose={() => setViewingNote(null)} 
        />
      )}
    </div>
  );
}

export default App;
