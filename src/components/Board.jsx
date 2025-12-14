export default function Board({title,children,onDrop}){

  const desc = {
    "To-Do": "Tasks that you have planned but not started yet.",
    "In-Progress": "Tasks you are currently working on.",
    "Completed": "Tasks that are finished successfully."
  }

  return(
    <div
      className="board"
      onDragOver={e=>e.preventDefault()}
      onDrop={onDrop}
    >
      <h3>{title}</h3>
      <p className="board-desc">{desc[title]}</p>

      {children.length === 0 ? (
        <p className="empty">
          No tasks here right now.
          <br />
          Add a task or move one here.
        </p>
      ) : children}
    </div>
  )
}
