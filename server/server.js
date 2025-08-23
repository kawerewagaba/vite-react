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
    // TODO: edit the item in place, so that the task order does not change
    // currently it is taken to the end of the list
    const taskId = parseInt(req.params.id)
    const newTask = { id: taskId, text: req.body.text }

    tasks = tasks.filter(task => task.id !== taskId)
    tasks.push(newTask)

    // use a 200 instead of a 201 - both indicate content is returned in the response
    // however a 201 indicates a new resource was created, which is not the case with a PUT

    // return the new list, not just the updated task to avoid the client redoing the logic above - saving client resources
    // in this case it works since we display the entire list on the client side
    // in other cases, where the edited item is not part of a list, simply return the item edited, like it has been
    res.status(200).json(tasks)
})

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id)

    tasks = tasks.filter(task => task.id !== taskId)

    // instead of a 204 (not returning content aka the new list) - and fetching the new list in a separate network request
    // use a 200 (return the new list) and update the client
    res.status(200).json(tasks)
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})