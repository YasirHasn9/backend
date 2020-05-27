const router = require("express").Router();
const Users = require("./users-models");
const { validateUser } = require("../middleware/validateUser");
const { restrictedAuth } = require("../middleware/restrictedAuth");
const { validateUserId } = require("../middleware/validateUserId");

const db = require("../db/db-config");
router.get("/", restrictedAuth(), async (req, res, next) => {
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
  res.status(200).end();
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
