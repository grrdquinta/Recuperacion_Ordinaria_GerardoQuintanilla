import express from "express"
import cors from "cors"

import studentsRoutes from "./src/routes/studentsRoutes.js"

const app = express()

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))
app.use(express.json())


app.use("/api/students", studentsRoutes)

export default app