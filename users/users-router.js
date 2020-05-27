const router = require("express").Router();
const Users = require("./users-models");
const { checkUser } = require("../middleware/checkUser");
const { restrictedAuth } = require("../middleware/restrictedAuth");
router.get("/", restrictedAuth(), async (req, res, next) => {
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

router.get("/:id", async (req, res, next) => {
  try {
    const user = await Users.findByUserId(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const user = await Users.remove(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).end();
  } catch (err) {
    next(err);
  }
});
module.exports = router;
