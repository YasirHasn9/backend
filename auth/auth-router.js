const router = require("express").Router();
const Users = require("../users/users-models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateUser } = require("../middleware/validateUser");
const { check, validationResult } = require("express-validator");

router.post(
  "/register",
  validateUser(),
  [
    check("username", "Please Enter a Valid Username")
      .not()
      .isEmpty(),
    check("password", "Please enter a min 6 characters Password").isLength({
      min: 6
    })
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    try {
      const user = await Users.add(req.body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }

    // let user = req.body;
    // const rounds = process.env.HASH_PASSWORD_ROUNDS || 12;
    // user.password = bcrypt.hashSync(user.password, rounds);

    // Users.add(user)
    //   .then(saved => {
    //     //jwt should be generated
    //     const token = generateToken(saved);
    //     res.status(201).json({
    //       user: saved,
    //       token
    //     });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     res.status(500).json(error);
    //   });
  }
);

// router.post("/login", (req, res) => {
//   let { username, password } = req.body;

//   Users.findBy({ username })
//     .first()
//     .then(user => {
//       if (user && bcrypt.compareSync(password, user.password)) {
//         const token = generateToken(user);

//         res.status(200).json({
//           message: `Welcome ${user.username}!`,
//           token
//         });
//       } else {
//         res.status(401).json({ message: "Invalid Credentials" });
//       }
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = Users.findBy({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const passwordValid = await bcrypt.hashSync(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = generateToken(user);
    res.cookie("token", token);
    res.json({ message: `Welcome ${username}`, token });
  } catch (err) {
    next(err);
  }
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
