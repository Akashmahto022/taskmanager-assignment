import express from "express"
import { tokenVerify } from "../middlewares/auth.middleware.js"
import { register, login, logout } from "../controllers/user.controller.js";


const userRouter = express.Router();

userRouter.post('/signup', register)
userRouter.post('/login', login)
userRouter.post('/logout',tokenVerify, logout)

export default userRouter