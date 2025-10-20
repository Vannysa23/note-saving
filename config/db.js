import mysql from 'mysql2'
import dotenv from 'dotenv'

// Load from project root .env if present, then fallback to server/.env
dotenv.config()

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

console.log('ENV TEST:', {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
})

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err)
    return
  }
  console.log('Connected to MySQL')
})

export default db
