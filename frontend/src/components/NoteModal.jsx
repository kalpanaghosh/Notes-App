import React from 'react';

const NoteModal = ({ note, onClose }) => {
  if (!note) return null;

  // Format date correctly
  const formattedDate = new Date(note.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Handle click outside to close
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content glass-panel popup-animation">
        <div className="modal-header">
          <h2 className="modal-title">{note.title}</h2>
          <button className="icon-btn close-btn" onClick={onClose} title="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <div className="modal-body">
          <p>{note.content}</p>
        </div>
        
        <div className="modal-footer">
          <span className="note-date">Created on: {formattedDate}</span>
          <button className="btn btn-secondary" onClick={onClose}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
