import express from 'express'
import {tokenVerify} from "../middlewares/auth.middleware.js"
import {createCategory, updateCategory, deleteCategory, getCategory} from '../controllers/category.controller.js'

const categoryRouter = express.Router();

categoryRouter.post("/create",tokenVerify , createCategory)
categoryRouter.get("/get",tokenVerify , getCategory)
categoryRouter.put("/update/:id", tokenVerify, updateCategory)
categoryRouter.delete("/delete/:id", tokenVerify, deleteCategory)

export default categoryRouter