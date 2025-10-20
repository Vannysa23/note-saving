import db from '../config/db.js'

const User = {
  create: (user, callback) => {
    const { username, email, password } = user
    db.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password],
      callback,
    )
  },

  findByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback)
  },

  getAll: (callback) => {
    db.query('SELECT id, username, email FROM users', callback)
  },
}

export default User
