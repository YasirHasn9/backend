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

router.get("/:id", async (req, res, next) => {
  try {
    const song = await Songs.findSongById(req.params.id);
    if (!song) {
      return res.status(404).json(song);
    }
    res.json(song);
  } catch (err) {}
});
module.exports = router;
