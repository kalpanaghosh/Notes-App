import { useState, useEffect } from "react";

const NoteForm = ({ onSubmit, initialData, onCancel }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Update form when editing a note
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    onSubmit({ title, content });
    
    if (!initialData) {
      setTitle("");
      setContent("");
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's this about?"
          className="form-input"
          required
          maxLength={100}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing your thoughts here..."
          className="form-input form-textarea"
          required
          rows={6}
        />
      </div>

      <div className="form-actions">
        {onCancel && (
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          {initialData ? "Update Note" : "Save Note"}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
