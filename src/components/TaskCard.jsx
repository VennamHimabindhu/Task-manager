export default function TaskCard({ t, start, complete, del }) {

  const today = new Date().toISOString().slice(0,10)
  const overdue = t.dueDate && t.dueDate < today && !t.completed

  return (
    <div className={`task ${t.completed ? "done" : ""}`}>
      <div className="task-title">{t.title}</div>
      <small className={`prio ${t.priority.toLowerCase()}`}>
        Priority: {t.priority}
      </small>
      <p style={{fontSize:"12px",margin:"6px 0",color:"#555"}}>
        {t.description || "No description"}
      </p>
      <p 
        style={{
          fontSize:"12px",
          margin:"4px 0",
          color: overdue ? "#dc2626" : "#374151",
          fontWeight: overdue ? "600" : "normal"
        }}>
        Due: {t.dueDate ? t.dueDate : "No due date"}
        {overdue && " ⚠ overdue"}
      </p>
      <div className="actions">
        {!t.started && !t.completed && (
          <button onClick={()=>start(t.id)}>Start</button>
        )}
        {t.started && !t.completed && (
          <button onClick={()=>complete(t.id)}>Done</button>
        )}
        <button className="del" onClick={()=>del(t.id)}>Delete</button>
      </div>
    </div>
  )
}
