const router = require("express").Router();
const Users = require("../users/users-models");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res, next) => {
  const authError = {
    message: "Invalid Credentials"
  };
  try {
    const credentials = req.body;
    const rounds = process.env.HASH_PASSWORD_ROUNDS || 12;
    const hash = bcrypt.hashSync(credentials.password, rounds);
    credentials.password = hash;
    const user = await Users.add(credentials);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
