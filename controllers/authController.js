const axios = require("axios");

async function googleAuth(req, res) {

  res.send("<h1>Google callback route</h1>")

  const code = req.query.code;
  const clientID = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = "http://localhost:3000/auth/google/callback";
  const tokenUrl = "https://oauth2.googleapis.com/token";

  const tokenResponse = await axios.post(tokenUrl, {
    code,
    client_id: clientID,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  });

  const accessToken = tokenResponse.data.access_token;

  res.redirect(
    `http://localhost:5173/callback/google/#access_token=${accessToken}`
  );
}

async function spotifyAuth(req, res) {
  const code = req.query.code;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = "http://localhost:3000/auth/spotify/callback";
  const tokenUrl = "https://accounts.spotify.com/api/token";

  try {
    const tokenResponse = await axios({
      method: "post",
      url: tokenUrl,
      data: new URLSearchParams({
        code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        // Spotify requires client credentials to be encoded in base64
        Authorization:
          "Basic " +
          Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
      },
    });

    const accessToken = tokenResponse.data.access_token;

    // Redirect the user back to your frontend application with the access token
    res.redirect(
      `http://localhost:5173/callback/spotify/#access_token=${accessToken}`
    );
  } catch (error) {
    console.error("Error fetching Spotify access token", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { googleAuth, spotifyAuth };
