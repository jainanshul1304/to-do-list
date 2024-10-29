const { verifyToken } = require('./generateAndVerifyToken');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader;
    
    try {
      req.user = verifyToken(token);
      console.log("Succesful token authentication");
      next();
    } catch {
      return res.status(403).send({ success: false, message: 'Invalid or expired token' });
    }
  } else {
    return res.status(401).send({ success: false, message: 'Token missing' });
  }
};

module.exports = authenticateJWT;
