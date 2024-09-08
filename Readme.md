# FFUF Web Parser

## Overview

**FFUF Web Parser** is a web-based tool built using **React** and **Node.js** that allows users to upload FFUF JSON files, apply a variety of filters, and export the filtered results to an Excel file. The tool supports filtering based on status codes, response data, lines, length, and URLs (including regex filtering). It also provides the ability to view, manipulate, and extract valuable information from FFUF fuzzing results.

<img src="./frontend/public/logo.png" alt="Logo" width="200"/>


## Features

- **Upload FFUF JSON**: Upload FFUF output files for processing.
- **Filtering Options**:
  - Filter by status code.
  - Filter by words (in URLs or response data).
  - Filter by number of lines.
  - Filter by response length.
  - Filter URLs using regular expressions.
  - Matching capabilities for status codes, words, lines, lengths, and URLs.
- **Export Filtered Results to Excel**.
- **Display Current Filters**: See which filters are applied.
- **Clear Filters**: Reset all filters and start fresh.

## Tech Stack

- **Frontend**: React, Bootstrap
- **Backend**: Node.js, Express
- **File Handling**: `express-fileupload`
- **Data Export**: `xlsx`

## Getting Started

### Prerequisites

- **Node.js**: Ensure that Node.js is installed (v12+ recommended).
- **npm**: Node package manager should also be installed.


### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/ffuf-web-parser.git
   cd ffuf-web-parser
   ```

2. Install dependencies for both the frontend and backend.

**Backend**:

   ```bash
   cd backend
   npm install
   ```

**Frontend**:

   ```bash
   cd ../frontend
   npm install
   ```

### Start the Web App:

Go to the frontend directory and run:

   ```bash
   chmod +x run.sh && ./run.sh
   ```

This will launch the React app at `http://localhost:3001`.

---

### Usage

- **Upload a JSON File**: After starting the app, navigate to the File Upload section and select the FFUF JSON file you want to parse.

- **Apply Filters**:
  - Filter by status code, words, lines, response size, or even URL regex.
  - Use the matching filters for more advanced options.

- **View Results**: The filtered results will be displayed in a responsive table. Long URLs can be scrolled horizontally without breaking the layout.

- **Export to Excel**: Once filtered, you can export the results to an Excel file by clicking the Export to Excel button.

---

### File Structure

```graphql
ffuf-web-parser/
├── backend/            # Backend (Node.js)
│   ├── app.js          # Main Express server
│   ├── package.json    # Backend dependencies
│   └── routes/
│       └── ffuf.js     # Route for processing uploads and filters
├── frontend/           # Frontend (React)
│   ├── public/
│   │   └── index.html  # Main HTML file
│   │   └── logo.png    # Logo for the app
│   ├── src/
│   │   ├── components/
│   │   │   └── FileUpload.js # Main component for file uploads and filtering
│   │   ├── services/
│   │   │   └── api.js   # Axios service for API calls
│   │   ├── index.js     # Entry point for the React app
│   │   ├── App.js       # Main App component
│   │   └── App.css      # Custom CSS for the app
└── README.md           # Project documentation
```

---

### Screenshots

- **Upload and Filters**
- **Filtered Results**
- **Export to Excel**

---

### Contributing

Contributions are welcome! If you have suggestions, improvements, or want to add new features, feel free to open a pull request or raise an issue.

#### How to Contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit and push your changes (`git push origin feature-branch`).
5. Open a pull request.

---

### License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

### Contact

For questions or suggestions, feel free to reach out via GitHub Issues or hello@agilehunt.com .
