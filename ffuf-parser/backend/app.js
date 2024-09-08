const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const ffufRouter = require('./routes/ffuf');

const app = express();

// Enable CORS to allow frontend to communicate with backend
app.use(cors());

// Enable file uploads
app.use(fileUpload());

// Parse incoming JSON requests
app.use(express.json());

// Use the ffuf router for handling the file upload and filters
app.use('/ffuf', ffufRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
