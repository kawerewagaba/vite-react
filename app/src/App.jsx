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

  // next we are getting a single task from the api
  // have a link to click
  // navigate to a page with that task
  // do the same in case of hotlinking - user types url in browser, or navigates to a shared link
  // that task page can have task specific stuff

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
      setTasks(data)
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
          <button onClick={() => editTask(edit.taskId)}>Apply</button>
          :
          <button onClick={addTask}>Add</button> 
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
                  // TODO: mode should change for only this item, not all, as it is currently
                  setEdit({ mode: false, taskId: null })
                  setInput('')
                }}>
                  Cancel
                </button>
                :
                <button onClick={() => {
                  // TODO: mode should change for only this item, not all, as it is currently
                  setEdit({ mode: true, taskId: task.id })
                  setInput(task.text)
                }}>
                  Edit
                </button>
              }
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
