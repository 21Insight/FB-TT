var express = require("express");
var router = express.Router();
var spotifyApi = require("../spotifyApi");
var MongoClient = require("mongodb").MongoClient;

// Get Albums

router.get("/albums/:request", function (req, res) {
  try {
    spotifyApi
      .searchAlbums(req.params.request, {
        limit: 50,
      })
      .then(function (data) {
        saveSearchResults(data);
        searchLikeRequest(req.params.request).then(function (data) {
          res.status(200).json(data);
        });
      });
  } catch (err) {
    console.log("Error: " + err);
  }
});

function saveSearchResults(data) {
  var albums = [];
  for (var i = 0; i < data.body.albums.items.length; i++) {
    var album = data.body.albums.items[i];
    albums.push({
      _id: album.id,
      name: album.name,
      artist: album.artists[0].name,
      year: album.release_date.substring(0, 4),
      url: album.external_urls.spotify,
      image: album.images[0].url,
    });
  }

  MongoClient.connect(
    "mongodb+srv://ms_albums:" +
      process.env.DATABASE_PASSWORD +
      "@fb-tt-db.epeie.mongodb.net/?retryWrites=true&w=majority",
    function (err, db) {
      if (err) throw err;
      var dbo = db.db("albums");
      try {
        dbo.collection("search_result").insertMany(albums, {
          ordered: false,
        });
        db.close();
      } catch (err) {
        console.log("Error: " + err);
        db.close();
      }
    }
  );
}

async function searchLikeRequest(request) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      "mongodb+srv://ms_albums:" +
        process.env.DATABASE_PASSWORD +
        "@fb-tt-db.epeie.mongodb.net/?retryWrites=true&w=majority",
      function (err, db) {
        if (err) throw err;
        var dbo = db.db("albums");
        dbo
          .collection("search_result")
          .find({ name: { $regex: request, $options: "i" } })
          .toArray(function (err, result) {
            if (err) throw err;
            db.close();
            resolve(result);
          });
      }
    );
  });
}

module.exports = router;
