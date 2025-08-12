import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')

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
    .then(data => setTasks([...tasks, data]))
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
        <button onClick={addTask}>add task</button>
      </div>
      <div>
        {
          tasks.map(task => (
            <div key={task.id}>
              {task.text}
              <button onClick={() => deleteTask(task.id)}>delete task</button>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
