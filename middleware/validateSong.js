const Songs = require("../songs/songs-models");

module.exports = {
  validateSong
};
function validateSong() {
  return async (req, res, next) => {
    const { title, song_by } = req.body;
    try {
      if (!title || !song_by) {
        return res
          .status(401)
          .json({ message: "Please provide both title and song_by" });
      }
      const song = await Songs.findBy({ title });
      if (song) {
        return res.status(401).json({ message: "Song already been released" });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}
