const Users = require("../users/users-models");

module.exports = {
  validateUser
};
function validateUser() {
  return async (req, res, next) => {
    try {
      if (!req.body.username || !req.body.password) {
        return res
          .status(401)
          .json({ message: "Please provide both Username and password" });
      } else {
        const user = await Users.findBy({ username: req.body.username });
        if (user) {
          return res.status(409).json({ message: "user already there" });
        }
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}
