import express from "express";
import { tokenVerify } from "../middlewares/auth.middleware.js";
import {
  createTask,
  getTask,
  getTasks,
  updatetask,
  deleteTask,
} from "../controllers/task.controller.js";

const taskRouter = express.Router();

taskRouter.post("/create-task",tokenVerify, createTask);
taskRouter.post("/get-task:id",tokenVerify, getTask);
taskRouter.post("/all-tasks",tokenVerify, getTasks);
taskRouter.post("/update-task:id",tokenVerify, updatetask);
taskRouter.post("/delete-task:id",tokenVerify, deleteTask);

export default taskRouter;
