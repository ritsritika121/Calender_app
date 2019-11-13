const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    start: {
        type: Date,
        required: true,
        trim: true
    },
    end: {
        type: Date,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    allDay: {
        type: Boolean,
        // required:true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task