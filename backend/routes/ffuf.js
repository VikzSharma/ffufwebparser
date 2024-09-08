const express = require('express');
const router = express.Router();

router.post('/upload', (req, res) => {
  const file = req.files.file;
  const jsonData = JSON.parse(file.data.toString('utf8'));

  // Get filter parameters from the query
  const { statusFilter, minSize, maxSize } = req.query;

  let filteredData = jsonData.results;

  // Apply status code filter if provided
  if (statusFilter) {
    filteredData = filteredData.filter((item) => item.status == statusFilter);
  }

  // Apply size filters (minSize and maxSize)
  if (minSize || maxSize) {
    filteredData = filteredData.filter((item) => {
      const size = item.length || 0;
      return (!minSize || size >= parseInt(minSize)) && (!maxSize || size <= parseInt(maxSize));
    });
  }

  res.json(filteredData);
});

module.exports = router;
