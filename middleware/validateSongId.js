const Songs = require("../songs/songs-models");
module.exports = { validateSongId };
function validateSongId() {
  // do your magic!
  return async (req, res, next) => {
    try {
      let song = await Songs.findSongById(req.params.id);
      if (song) {
        req.song = song;
        next();
      } else {
        res.status(500).json({
          message: "Song not found"
        });
      }
    } catch (err) {
      next(err);
    }
  };
}
