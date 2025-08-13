import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')
  const [edit, setEdit] = useState({ mode: false, taskId: null })

  useEffect(() => {
    fetch('http://localhost:3001/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
  }, [])

  const addTask = () => {
    fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input })
    })
    .then(res => res.json())
    .then(data => {
      setTasks([...tasks, data])
      setInput('')
    })
  }

  const editTask = (id) => {
    fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input })
    })
    .then(res => res.json())
    .then(data => {
      const filteredTasks = tasks.filter(task => task.id !== id)

      setTasks([...filteredTasks, data])
      setEdit({ mode: false, taskId: null })
      setInput('')
    })
  }

  const deleteTask = (id) => {
    fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => setTasks(data))
  }

  return (
    <>
      <div>
        <input type='text' value={input} onChange={e => setInput(e.target.value)} />
        {
          edit.mode ?
          <button onClick={() => editTask(edit.taskId)}>edit task</button>
          :
          <button onClick={addTask}>add task</button> 
        }
      </div>
      <div>
        {
          tasks.map(task => (
            <div key={task.id}>
              { task.text }
              {
                edit.mode ?
                <button onClick={() => {
                  setEdit({ mode: false, taskId: null })
                  setInput('')
                }}>
                  cancel
                </button>
                :
                <button onClick={() => {
                  setEdit({ mode: true, taskId: task.id })
                  setInput(task.text)
                }}>
                  edit task
                </button>
              }
              <button onClick={() => deleteTask(task.id)}>delete task</button>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
