import express from 'express'
import cors from 'cors'
import cookieparser from 'cookie-parser'
import userRouter from "./routes/user.route.js"
import taskRouter from './routes/task.route.js'
import categoryRouter from './routes/category.route.js'

const app = express()

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || 'https://taskmanager-gvc6.onrender.com',
        credentials: true
    })
)

app.use(express.json())
app.use(cookieparser())

app.use('/api/user', userRouter)
app.use('/api/task', taskRouter)
app.use('/api/category', categoryRouter)

app.get("/", (req, res)=>{
    res.send("Hi Its Akash")
})
app.get("/task", (req, res)=>{
    res.send("you can now start building your tas manager app")
})


export default app

