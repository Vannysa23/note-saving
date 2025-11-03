import express from 'express'
// import axios from 'axios'
import { createUser, login, getAllUsers, checkAuth, logout } from '../../controllers/authController.js'
// import { authenticate } from '../../middleware/auth.js'

const router = express.Router()

// Create a user
router.post('/register', createUser)
router.post('/login', login)
router.delete('/logout', logout)
router.get('/check-auth', checkAuth)
router.get('/allUsers', getAllUsers)

// // Update a user
// router.put('/:id', (req, res) => {
//   const { name, email, age } = req.body
//   const query = 'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?'
//   db.query(query, [name, email, age, req.params.id], (err, result) => {
//     if (err) {
//       return res.status(400).json({ message: err.message })
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'User not found' })
//     }
//     res.json({ id: parseInt(req.params.id), name, email, age })
//   })
// })

// // Delete a user
// router.delete('/:id', (req, res) => {
//   const query = 'DELETE FROM users WHERE id = ?'
//   db.query(query, [req.params.id], (err, result) => {
//     if (err) {
//       return res.status(500).json({ message: err.message })
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'User not found' })
//     }
//     res.json({ message: 'User deleted' })
//   })
// })


export default router
