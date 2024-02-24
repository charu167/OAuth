const axios = require("axios");

async function googleAuth(req, res) {
  try {
    const code = req.query.code;
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri =
      "https://o-auth-callback-sla.vercel.app/api/callbackGoogle";
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
      `https://o-auth-client-blue.vercel.app/callback/google/#access_token=${accessToken}`
    );
  } catch (error) {
    res.send(error);
  }
}

async function spotifyAuth(req, res) {
  const code = req.query.code;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri =
    "https://o-auth-callback-sla.vercel.app/api/callbackSpotify";
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
      `https://o-auth-client-blue.vercel.app/callback/spotify/#access_token=${accessToken}`
    );
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = { googleAuth, spotifyAuth };
