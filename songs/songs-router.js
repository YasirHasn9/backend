const router = require("express").Router();
const Songs = require("./songs-models");
const { validateSong } = require("../middleware/validateSong");
const { validateSongId } = require("../middleware/validateSongId");

router.get("/", async (req, res, next) => {
  try {
    const songs = await Songs.find();
    res.json(songs);
  } catch (err) {
    next(err);
  }
});

router.post("/", validateSong(), async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.song_by) {
      return res
        .status(401)
        .json({ message: "Please provide both title and song by!" });
    }
    const song = await Songs.add(req.body);
    res.status(201).json(song);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateSongId(), async (req, res, next) => {
  await res.json(req.song);
});

module.exports = router;
