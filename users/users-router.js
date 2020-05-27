const router = require("express").Router();
const Users = require("./users-models");
const { checkUser } = require("../middleware/checkUser");

router.get("/", async (req, res, next) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post("/", checkUser(), async (req, res, next) => {
  try {
    const user = await Users.add(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
