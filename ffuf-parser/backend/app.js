
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const ffufRouter = require('./routes/ffuf');

const app = express();

app.use(cors());
app.use(fileUpload());
app.use(express.json());

app.use('/ffuf', ffufRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
