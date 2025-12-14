export default function Modal({close,save,form,setForm}){

  return(
    <div className="modal-bg">
      <div className="modal">
        <input
          placeholder="title"
          value={form.title}
          onChange={e=>setForm({...form,title:e.target.value})} />
        <textarea
          placeholder="description"
          value={form.description}
          onChange={e=>setForm({...form,description:e.target.value})}/>
        <select
          value={form.priority}
          onChange={e=>setForm({...form,priority:e.target.value})}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <input
          type="date"
          value={form.dueDate}
          onChange={e=>setForm({...form,dueDate:e.target.value})} />
        <div className="modal-btns">
          <button onClick={close}>close</button>
          <button onClick={save}>save</button>
        </div>
      </div>
    </div>
  )}
