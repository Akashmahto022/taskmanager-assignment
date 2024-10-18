import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const register = async (req, res)=>{
    res.json({status: 200, message: "register"})
}
const login = async (req, res)=>{
    res.json({status: 200, message: "register"})
}
const logout = async (req, res)=>{
    res.json({status: 200, message: "register"})
}


export {
    register,
    login,
    logout
}