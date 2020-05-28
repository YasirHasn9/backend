const router = require("express").Router();
const Users = require("../users/users-models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateUser } = require("../middleware/validateUser");

router.post("/register", validateUser(), async (req, res, next) => {
  const authError = {
    message: "Invalid Credentials"
  };
  try {
    const credentials = req.body;
    const rounds = process.env.HASH_PASSWORD_ROUNDS || 12;
    const hash = bcrypt.hashSync(credentials.password, rounds);
    credentials.password = hash;
    const user = await Users.add(credentials);
    if (user) {
      res.json(user);
    } else {
      res.status(401).json(authError);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  const authError = {
    message: "Invalid Credentials"
  };
  try {
    const user = await Users.findBy({ username: req.body.username });
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json(authError);
    }
    const payload = {
      id: user.id,
      username: user.username
    };
    const secret = process.env.SECRET_TOKEN || "it's just a secret";
    const token = jwt.sign(payload, secret);
    res.cookie("token", token);
    res.status(200).json({ message: `welcome ${user.username}`, token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
