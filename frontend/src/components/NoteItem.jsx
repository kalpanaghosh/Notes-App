const NoteItem = ({ note, onDelete, onEdit, onView }) => {
  // Format date correctly
  const formattedDate = new Date(note.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article className="note-card glass-panel selected-hover">
      <div className="note-card-header" onClick={() => onView(note._id)} style={{ cursor: 'pointer' }}>
        <h3 className="note-title">{note.title}</h3>
      </div>
      
      <div className="note-body" onClick={() => onView(note._id)} style={{ cursor: 'pointer' }}>
        <p>{note.content}</p>
      </div>
      
      <div className="note-footer">
        <span className="note-date">{formattedDate}</span>
        
        <div className="note-actions">
          <button 
            className="icon-btn view-btn" 
            onClick={() => onView(note._id)}
            title="View full note"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </button>
          <button 
            className="icon-btn edit-btn" 
            onClick={onEdit}
            title="Edit note"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
          </button>
          <button 
            className="icon-btn delete-btn" 
            onClick={() => onDelete(note._id)}
            title="Delete note"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          </button>
        </div>
      </div>
    </article>
  );
};

export default NoteItem;
