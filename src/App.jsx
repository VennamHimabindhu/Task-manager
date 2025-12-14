import { useEffect, useState } from "react"
import Board from "./components/Board"
import TaskCard from "./components/TaskCard"
import Modal from "./components/Modal"

export default function App() {

  const [tasks, setTasks] = useState([])
  const [show, setShow] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: ""
  })
  useEffect(() => {
    const saved = localStorage.getItem("tasks")
    if (saved) {
      setTasks(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const openModal = () => {
    setEditId(null)
    setForm({
      title: "",
      description: "",
      priority: "Low",
      dueDate: ""
    })
    setShow(true)}
  const saveTask = () => {
    if (editId) {
      setTasks(list =>
        list.map(item =>
          item.id === editId ? { ...item, ...form } : item
        ))} else {
      setTasks([
        ...tasks,
        {
          ...form,
          id: Date.now(),
          started: false,
          completed: false
        }
      ])}
    setShow(false)
  }
  const startTask = (id) => {
    setTasks(list =>
      list.map(item =>
        item.id === id ? { ...item, started: true } : item))}
  const completeTask = (id) => {
    setTasks(list =>
      list.map(item =>
        item.id === id ? { ...item, completed: true } : item))}
  const deleteTask = (id) => {
    if (confirm("Delete task?")) {
      setTasks(list => list.filter(item => item.id !== id))
    }
  }

  return (
    <div>
      <div className="navbar">
        <div>
          <h1>Task Manager</h1>
          <p className="sub">
            Manage tasks and monitor progress in one place.
          </p>
        </div>
        <button className="btn" onClick={openModal}>
          Add Task
        </button>
      </div>
      <div className="info">
        <p>• Start a task to mark it in progress</p>
        <p>• Complete a task only when fully done</p>
      </div>
      <div className="container">
        <Board title="To-Do">
          {tasks
            .filter(t => !t.completed)
            .map(t => (
              <TaskCard
                key={t.id}
                t={t}
                start={startTask}
                complete={completeTask}
                del={deleteTask}
              />
            ))}
        </Board>
        <Board title="In-Progress">
          {tasks
            .filter(t => t.started && !t.completed)
            .map(t => (
              <TaskCard
                key={t.id}
                t={t}
                start={startTask}
                complete={completeTask}
                del={deleteTask}
              />
            ))}
        </Board>
        <Board title="Completed">
          {tasks
            .filter(t => t.completed)
            .map(t => (
              <TaskCard
                key={t.id}
                t={t}
                del={deleteTask} />
            ))}
        </Board>
      </div>
      {show && (
        <Modal
          close={() => setShow(false)}
          save={saveTask}
          form={form}
          setForm={setForm}
        />
      )}
    </div>
  )}
