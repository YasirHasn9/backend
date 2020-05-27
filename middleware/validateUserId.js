const Users = require("../users/users-models");
module.exports = { validateUserId };
function validateUserId() {
  // do your magic!
  return async (req, res, next) => {
    try {
      let user = await Users.findByUserId(req.params.id);
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(500).json({
          message: "User not found"
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}
