const router = require("express").Router();
const Users = require("./users-models");
const { validateUser } = require("../middleware/validateUser");
const { validateUserId } = require("../middleware/validateUserId");
const jwt = require("jsonwebtoken");

function testUser(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(
      token,
      process.env.TOKEN_SECRET || "it's just a secret",
      (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.status(401).json({
            message: "not verified"
          });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      }
    );
  } else {
    res.status(400).json({
      message: "no token provided"
    });
  }
}
router.get("/", testUser, async (req, res, next) => {
  console.log("decoded", req.decodedToken);
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post("/", validateUser(), async (req, res, next) => {
  try {
    const user = await Users.add(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateUserId(), async (req, res) => {
  await res.json(req.user);
});

router.put("/:id", validateUserId(), async (req, res) => {
  const user = await Users.update(req.params.id, req.body);
  res.status(200).json(user);
});

router.delete("/:id", validateUserId(), async (req, res, next) => {
  await Users.remove(req.params.id);
  res.status(200).json({ removed: req.params.id });
});

router.get("/:id/songs", validateUserId(), async (req, res, next) => {
  try {
    const songs = await Users.getUserSong(req.params.id);
    res.json(songs);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
