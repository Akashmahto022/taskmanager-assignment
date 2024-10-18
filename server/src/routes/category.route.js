import express from 'express'
import {tokenVerify} from "../middlewares/auth.middleware.js"
import {createCategory, updateCategory, deleteCategory} from '../controllers/category.controller.js'

const categoryRouter = express.Router();

categoryRouter.post("/create",tokenVerify , createCategory)
categoryRouter.patch("/update/:id", tokenVerify, updateCategory)
categoryRouter.delete("/delete/:id", tokenVerify, deleteCategory)

export default categoryRouter