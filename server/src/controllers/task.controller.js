import express from "express";
import { Task } from "../models/task.model.js";

const createTask = async (req, res) => {
  try {
    const userId = await req.user._id;
    console.log(userId);
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
      owner: userId,
      category: category,
    });

    await newTask.save();
    res.status(200).json({
      status: true,
      task: newTask,
      message: "task created successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "error while creating task",
    });
  }
};

const getTasks = async (req, res) => {
  const userId = await req.user._id;
  console.log(userId);
  try {
    const tasks = await Task.find({ user: userId }).populate("category");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(apiError(404, "Gig not Found"));

    res.status(200).send(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

const updatetask = async (req, res) => {
  const task = req.params.id;

  try {
    const updatedTask = await Task.findByIdAndUpdate(task, req.body, {
      new: true,
    });
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
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
