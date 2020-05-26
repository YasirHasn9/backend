const router = require("express").Router();
const Users = require("./users-models");

router.get("/", async (req, res, next) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
