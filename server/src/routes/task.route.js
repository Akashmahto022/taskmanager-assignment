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
taskRouter.get("/get/:id",tokenVerify, getTask);
taskRouter.get("/all-tasks",tokenVerify, getTasks);
taskRouter.patch("/update/:id",tokenVerify, updatetask);
taskRouter.delete("/delete/:id",tokenVerify, deleteTask);

export default taskRouter;
