import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.JWT_SECRET;
const ACCESS_EXP = process.env.JWT_EXPIRES_IN || '15m';
const REFRESH_EXP = process.env.JWT_REFRESH_EXPIRES_IN || '7d';


export const generateAccessToken = (userData) => {
  return jwt.sign({ id: userData.id, username: userData.username }, SECRET, {
      expiresIn: ACCESS_EXP,
    });
};

export const generateRefreshToken = (userData) => {
  return jwt.sign({ id: userData.id, username: userData.username }, SECRET, {
      expiresIn: REFRESH_EXP,
    });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return null;
  }
};
