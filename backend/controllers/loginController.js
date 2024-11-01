const { loginAuthenticator } = require("../services/loginService");
const { generateToken } = require("../utils/generateAndVerifyToken");
loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const status = await loginAuthenticator({ email, password });
    
    if (status.success) {
      const user = status.results;
      console.log(user);
      const token = generateToken({id : user.id });
      console.log(token);
      return res.status(200).send({ success: true, token});
    } else {
      return res.status(200).send({ success: false });
    }
  } catch (err) {
    console.log("Error occured : ", err.message);
    return res.status(400).send({ success: false });
  }
};

module.exports = { loginHandler };
