import express from "express";
import { Task } from "../models/task.model.js";


const createTask = async (req, res) => {
  try { 
    const {id} = await req.user;
    console.log(id);
    const { title, description, status, dueDate, category } = req.body;

    if (!title & !status) {
      res.status(500).json({
        status: false,
        message: "title and status are required to create a task",
      });
    }

    const newTask = await Task({
      title: title.toLowerCase(),
      description: description,
      status: status,
      dueDate: dueDate,
      owner: id,
      category: category,
    });
    console.log(newTask)

    const savedTask = await newTask.save();
    return res.status(200).json({
      status: true,
      task: savedTask,
      message: "task created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "error while creating task",
    });
  }
};

const getTasks = async (req, res) => {
  const userId = await req.user._id;
  console.log(userId);
  try {
    const tasks = await Task.find({ owner: userId }).populate("category");
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching tasks", error });
  }
};

const getTask = async (req, res) => {
    const {id} = req.params
    console.log(id)
  try {
    const task = await Task.findById(id).populate('category', 'status')

    if (!task) return next(apiError(404, "Task not Found"));

    return res.status(200).send(task);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching tasks", error });
  }
};

const updatetask = async (req, res) => {
  const {id} = req.params;
  const update = req.body

  try {
    const task = await Task.findByIdAndUpdate(id,update, {
      new: true,
      runValidators: true
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res
      .status(200)
      .json({ message: "Task updated successfully", task: task });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    await Task.findByIdAndDelete(task);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ status: true, message: "Task delete successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

export { createTask, getTask, getTasks, updatetask, deleteTask };
