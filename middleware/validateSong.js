const Songs = require("../songs/songs-models");

module.exports = {
  validateSong
};
function validateSong() {
  return async (req, res, next) => {
    try {
      if (!req.body.title || !req.body.song_by) {
        return res
          .status(401)
          .json({ message: "Please provide both title and song_by" });
      }
      const user = await Songs.findBy({ title: req.body.title });
      if (user) {
        return res.status(401).json({ message: "Song already there" });
      }
      next();
    } catch (err) {
      console.log("validateSong", err);
      next(err);
    }
  };
}
