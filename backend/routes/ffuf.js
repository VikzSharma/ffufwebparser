const express = require('express');
const router = express.Router();

router.post('/upload', (req, res) => {
  const file = req.files.file;
  const jsonData = JSON.parse(file.data.toString('utf8'));

  // Get the filters from the request query
  const { statusFilter, wordFilter, lineFilter, lengthFilter, urlRegexFilter } = req.query;

  let filteredData = jsonData.results;

  // Apply status code filter if provided
  if (statusFilter) {
    filteredData = filteredData.filter((item) => item.status == statusFilter);
  }

  // Apply word filter (in URL or response data) if provided
  if (wordFilter) {
    filteredData = filteredData.filter((item) =>
      item.url.includes(wordFilter) || (item.input.FUZZ && item.input.FUZZ.includes(wordFilter))
    );
  }

  // Apply line filter (min lines) if provided
  if (lineFilter) {
    filteredData = filteredData.filter((item) => item.lines >= parseInt(lineFilter));
  }

  // Apply length filter (min length) if provided
  if (lengthFilter) {
    filteredData = filteredData.filter((item) => item.length >= parseInt(lengthFilter));
  }

  // Apply URL regex filter if provided
  if (urlRegexFilter) {
    const regex = new RegExp(urlRegexFilter);
    filteredData = filteredData.filter((item) => regex.test(item.url));
  }

  // Return the filtered data
  res.json(filteredData);
});

module.exports = router;
