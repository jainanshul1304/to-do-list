const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.SUPER_SECRET_KEY;
const EXPIRES_IN = process.env.EXPIRES_IN;
const generateToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, {
    expiresIn: EXPIRES_IN,
  }); 

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    throw new Error("Invalid or expired token");
  }
};
module.exports = {
  generateToken,
  verifyToken,
};
