const SerpApi = require("google-search-results-nodejs");
const search = new SerpApi.GoogleSearch(
  "6eee262362ca892b8a5a7ebe0ac4f4294af03305db5fe35c2315af87370a5384"
);

const params = {
  device: "desktop",
  engine: "google",
  q: "Coffee",
  location: "Austin, Texas, United States",
  google_domain: "google.com",
  gl: "us",
  hl: "en",
};

const callback = function (data) {
  console.log(data);
};

// Show result as JSON
search.json(params, callback);
