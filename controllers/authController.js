import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'
import { registerSchema } from '../validator/validator.js'
import { generateAccessToken, generateRefreshToken, verifyToken } from '../utils/jwt.js';
// import xss from 'xss'
// import { sanitizedBody } from '../middleware/sanitizedBody.js'

const saltRounds = 10

const createUser = async (req, res) => {

  const { error, value } = registerSchema.validate(req.body);

  if (error) return res.status(400).json({ success: false, error: error.details[0].message });

  const { username, email, password } = value;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, error: 'All fields required' })
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  User.findByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ message: 'Internal server error' })
    if (results.length > 0) return res.status(400).json( { success: false, error: 'Registration Failed!' })

    User.create({ username, email, password: hashedPassword }, (err, results) => {
      if (err) return res.status(500).json({ success: false, error: 'Internal server error' })
      res.status(201).json({ success: true, data: { userID: results.insertId} });
    })
  })
}

const login = (req, res) => {

  const { error, value } = registerSchema.validate(req.body);

  if (error) return res.status(400).json({ success: false, error: error.details[0].message });

  const { email, password } = value;

  if ( !email || !password) {
    return res.status(400).json({ success: false, error: 'All fields required' })
  }

  User.findByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ success: false, error: 'Internal server error' })
    if (results.length === 0) return res.status(401).json({ success: false, error: 'Invalid incredential!' })

    const user = results[0]
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ success: false, error: 'Internal server error' })
      if (!isMatch) return res.status(401).json({ success: false, error: 'Invalid credential!' })
      console.log('123')

      const token = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      console.log(token)

      res.cookie('accesstoken', token, {
        httpOnly: true,
        secure: true,
        samesite : 'Strict',
        maxAge: 24 * 60 * 1000, // 1day
      })
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({ success: true, data: 'Login successfully' })
    })
  })
}

const getAllUsers = (req, res) => {
  User.getAll((err, data) => {
    if (err) return res.status(500).json({ message: 'Internal server error' })
    if (data.length === 0) return res.status(404).json({ message: 'No User Found!'})

    if (data.length > 0) {
      res.status(200).json({ message: 'User Found!', users: data})
    }
  })
}

const checkAuth = (req, res) => {
  res.json({ success: true, user: req.user });
}

export {
  createUser,
  login,
  getAllUsers,
  checkAuth
}
