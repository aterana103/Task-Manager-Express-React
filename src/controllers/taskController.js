import Task from '../models/task.model.js';

export const getTasks = async (req, res) =>  {
    const task = await Task.find({ user : req.user.id }).populate("user");
    res.json(task);
}

export const getTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({message: "Task not found"});
    res.json(task);
}

export const createTask = async (req, res) => {
    const { title, description, date } = req.body;
    const newTask = new Task({title, description, date, user: req.user.id});
    const taskSaved = await newTask.save();
    res.status(201).json(taskSaved);
}

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
        new: true
    });
    if (!updatedTask) return res.status(404).json({message: "Task not found"});
    res.json(updatedTask);
}

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({message: "Task not found"});
    res.json({task, message: "Task deleted"});
}