const router = require("express").Router();

const { googleAuth, spotifyAuth } = require("../controllers/authController");

router.get("/google/callback", googleAuth);
router.get("/spotify/callback", spotifyAuth);

module.exports = router;
