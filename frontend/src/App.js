import React from 'react';
import FileUpload from './components/FileUpload'; // You can modularize components
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';  // Add Bootstrap for styling

function App() {
  return (
    <div className="App container mt-5">
      {/* Add a logo */}
      <div className="text-center mb-4">
        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="FFUF Parser Logo" className="logo" />
      </div>

      {/* Add a title and description */}
      <div className="text-center">
        <h1 className="display-4">FFUF Web Parser</h1>
        <p className="lead">Efficiently parse and filter FFUF JSON data with ease.</p>
      </div>

      {/* Main content - File Upload */}
      <div className="file-upload-section">
        <FileUpload />
      </div>

      {/* Footer with links */}
      <footer className="text-center mt-5">
        <h6>
          Pull requests / Feature requests at <a href="https://github.com/VikzSharma/ffufguiparser">GitHub</a> - <a href="https://blog.agilehunt.com">Blog | Tool by Agilehunt</a>
        </h6>
      </footer>
    </div>
  );
}

export default App;
