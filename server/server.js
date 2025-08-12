const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

let tasks = []
let id = 1

app.get('/tasks', (req, res) => {
    res.status(200).json(tasks)
})

app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id)

    const task = tasks.find(task => task.id === taskId)

    res.status(200).json(task)
})

app.post('/tasks', (req, res) => {
    const task = { id: id++, text: req.body.text }

    tasks.push(task)

    res.status(201).json(task)
})

app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id)
    const newTask = { id: taskId, text: req.body.text }

    tasks = tasks.filter(task => task.id !== taskId)
    tasks.push(newTask)

    res.status(200).json(newTask)
})

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id)

    tasks = tasks.filter(task => task.id !== taskId)

    res.status(200).json(tasks)
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})