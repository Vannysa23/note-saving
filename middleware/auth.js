import { verifyToken } from '../utils/jwt.js';

export const authenticate = (req, res, next) => {
  const token = req.cookies.accesstoken;

  if (!token) return res.status(401).json({ message: 'Access Denied' });

  const verified = verifyToken(token);
  if (!verified) return res.status(401).json({ message: 'Invalid Token' });

  req.user = verified;
  next();
}


