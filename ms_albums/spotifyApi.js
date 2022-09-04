var SpotifyWebApi = require("spotify-web-api-node");

// Get Token

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

var spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
});

// Retrieve an access token
spotifyApi.clientCredentialsGrant().then(
  function (data) {
    // Save the access token
    spotifyApi.setAccessToken(data.body["access_token"]);
  },
  function (err) {
    console.log(
      "Something went wrong when retrieving an access token",
      err.message
    );
  }
);

module.exports = spotifyApi;
