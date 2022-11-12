const express = require("express");
const axios = require("axios");

const PORT = process.env.PORT || 3001;
const API_KEY =
  "6eee262362ca892b8a5a7ebe0ac4f4294af03305db5fe35c2315af87370a5384";

const app = express();
const SerpApi = require("google-search-results-nodejs");
const search = new SerpApi.GoogleSearch(API_KEY);

async function getSearchData(word) {
  let results = await axios
    .get(
      `https://serpapi.com/search.json?engine=google&q=${word}&google_domain=google.com&gl=us&hl=en&device=desktop&api_key=6eee262362ca892b8a5a7ebe0ac4f4294af03305db5fe35c2315af87370a5384`
    )
    .then((results) => {
      let searchResults = results.data;
      results = searchResults;
      return searchResults;
    });
  return results;
}

app.get("/search/:word", async (req, res) => {
  let results = await getSearchData(req.params.word);
  res.send({ searchResults: results });
});

// create a GET route
app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
