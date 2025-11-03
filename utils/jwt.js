import jwt from 'jsonwebtoken'
import { config } from '../config/env.js'

const SECRET = config.jwt.secret
const ACCESS_EXP = config.jwt.expiresIn
const REFRESH_EXP = config.jwt.refreshExpiresIn

export const generateAccessToken = (userData) => {
  return jwt.sign({ id: userData.id, username: userData.username }, SECRET, {
    expiresIn: ACCESS_EXP,
  })
}

export const generateRefreshToken = (userData) => {
  return jwt.sign({ id: userData.id, username: userData.username }, SECRET, {
    expiresIn: REFRESH_EXP,
  })
}

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET)
  } catch (error) {
    return null
  }
}
