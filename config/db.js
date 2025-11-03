import mysql from 'mysql2'
import { config } from './env.js'

//old way to connect to database
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// })

//new way to connect to database by create env file in config folder
const db = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
})



db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err)
    return
  }
  console.log('Connected to MySQL')
})

export default db
