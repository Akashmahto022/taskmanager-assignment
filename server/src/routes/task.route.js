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

taskRouter.post("/create",tokenVerify, createTask);
taskRouter.post("/get:id",tokenVerify, getTask);
taskRouter.post("/all-tasks",tokenVerify, getTasks);
taskRouter.post("/update:id",tokenVerify, updatetask);
taskRouter.post("/delete:id",tokenVerify, deleteTask);

export default taskRouter;
