import express from 'express'
import cors from 'cors'
import cookieparser from 'cookie-parser'
// import userRouter from './routes/user.route.js'

const app = express()

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
)

app.use(express.json())
app.use(cookieparser())

// app.use('/api', userRouter)

app.get("/", (req, res)=>{
    res.send("Hi Its Akash")
})
app.get("/task", (req, res)=>{
    res.send("you can now start building your tas manager app")
})


export default app

