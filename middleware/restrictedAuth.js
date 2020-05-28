const jwt = require("jsonwebtoken");

module.exports = { restrictedAuth };

function restrictedAuth() {
  const authError = {
    message: "Invalid Credentials"
  };
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json(authError);
      }
      jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
        if (err) {
          return res.status(401).json(authError);
        }
        req.token = decoded;
        console.log(decoded);
        next();
      });
    } catch (err) {
      next(err);
    }
  };
}
