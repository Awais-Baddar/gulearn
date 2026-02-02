import express from "express"
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import { connectDB } from "./lib/db.js"
import cookieParser from 'cookie-parser'
import chatRoutes from './routes/chat.route.js'
import cors from "cors"

dotenv.config()

const app = express();
const PORT = process.env.PORT;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true  
  })
);
app.use(express.json())
app.use(cookieParser()) // to acccess cookies inside requests
app.use('/api/auth', authRoutes)// har chz k routes alaihda 
app.use('/api/users',userRoutes)
app.use('/api/chat',chatRoutes)
app.listen(PORT,()=>{ 
console.log(`Server Running on ${PORT}`)
connectDB();
})