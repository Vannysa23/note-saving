// import path from 'path';
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { sanitizedBody } from './middleware/sanitizedBody.js'
import apiRoute from './router/api/userRoutes.js'
import helmet from 'helmet'
import { config } from './config/env.js'

const app = express()

// ---------- MIDDLEWARE ----------
const corsOptions = {
  origin: config.cors.origin,
  credentials: config.cors.credentials,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}

app.use(helmet())
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// ---------- API ROUTES ----------
app.use(sanitizedBody)
app.use('/api/users', apiRoute)

// const __dirname = path.resolve();
// const publicPath = path.join(__dirname, 'public');

// app.use(express.static(publicPath));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(publicPath, 'index.html'), err => {
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// });

app.listen(config.port, () => console.log(`Server running on port ${config.port}`))
