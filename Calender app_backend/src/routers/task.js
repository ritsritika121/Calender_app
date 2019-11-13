const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks',auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try { 
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e) 
    }
})

router.get('/tasks', auth, async (req, res) => {
    

    try {
        // const tasks = await Task.find({owner:req.user._id})
        await req.user.populate({
            path: 'tasks',
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router