const router = require("express").Router();
const Songs = require("./songs-models");

router.get("/", async (req, res, next) => {
  try {
    const songs = await Songs.find();
    res.json(songs);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
