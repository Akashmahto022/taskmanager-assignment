import express from 'express'
import { User } from '../models/user.model.js'
import {Task} from "../models/task.model.js"
import {Category} from "../models/category.model.js"

const createTask = async (req, res)=>{}
const getTasks = async (req, res)=>{}
const getTask = async (req, res)=>{}
const updatetask = async (req, res)=>{}
const deleteTask = async (req, res)=>{}

export  {
    createTask,
    getTask,
    getTasks,
    updatetask,
    deleteTask
}