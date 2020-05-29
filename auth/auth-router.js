const router = require("express").Router();
const Users = require("../users/users-models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateUser } = require("../middleware/validateUser");
const { check, validationResult } = require("express-validator");

router.post(
  "/register",
  [
    check("username", "Please Enter a Valid Username")
      .not()
      .isEmpty(),
    check("password", "Please enter a min 6 characters Password").isLength({
      min: 6
    })
  ],
  validateUser(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    let user = req.body;
    user.password = bcrypt.hashSync(user.password, 10);

    Users.add(user)
      .then(saved => {
        //jwt should be generated
        const token = generateToken(saved);
        res.status(201).json({
          user: saved,
          token
        });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json(error);
      });
  }
);

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          id: user.id,
          username: user.username,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  //header payload and verify signature
  const payload = {
    sub: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, process.env.SECRET_TOKEN, options);
}

module.exports = router;
