import express from "express"
import cors from "cors"
import { apiRouter } from "./server/apiRouter/apiRouter.js"
import { createGlobal, createContentPage, createParagrafPage, createAcc } from "./server/db/createTable.js"
import { put } from "@vercel/blob";

const PORT = process.env.PORT || 3000

const app = express()

// !!!!USE VALIDATOR AND USE NEON DB


// Middleware untuk parsing JSON
const allowedOrigins = [
  'http://localhost:8080', // Vite default port
  'http://localhost:5173', // Vite alternative port
  'https://althabase.vercel.app', // Production Vercel
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRouter)
// Route GET sederhana
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Aktivasi pembuatan tabel database
async function initializeDatabase() {
  try {
    await createGlobal()
    await createContentPage()
    await createParagrafPage()
    await createAcc()
    console.log("Database initialization completed")
  } catch (error) {
    console.error("Error initializing database:", error)
  }
}

// Menjalankan server pada port
app.listen(PORT, async () => {
  console.log(`Server berjalan di port ${PORT}`)
  await initializeDatabase()
})