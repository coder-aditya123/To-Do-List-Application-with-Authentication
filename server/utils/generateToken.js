// server/utils/generateToken.js
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '5d', // Token valid for 30 days
  });
};

export default generateToken;