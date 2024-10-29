const { verifyToken } = require("./generateAndVerifyToken");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader; 

    try {
      const decoded = verifyToken(token);
      req.user = decoded; 
      next();
    } catch (error) {
      return res.status(400).send({success : false, message : "Token invalid or expired"});
    }
  } else {
    return res.status(401).send({ success: false, message: "Token missing" });
  }
};

module.exports = authenticateJWT;
