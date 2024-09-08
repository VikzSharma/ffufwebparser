import React, { useState } from 'react';
import axios from '../services/api'; // Service to interact with backend
import { Container, Form, Button, Table, Row, Col } from 'react-bootstrap'; // Bootstrap components

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [minSize, setMinSize] = useState('');
  const [maxSize, setMaxSize] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const query = new URLSearchParams({
      statusFilter,  // Pass the status filter from state
      minSize,       // Pass the min size filter
      maxSize        // Pass the max size filter
    }).toString();

    const response = await axios.post(`ffuf/upload?${query}`, formData);  // Append query params to the URL
    setFilteredData(response.data);
  } catch (error) {
    console.error('File upload error', error);
  }
};


  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">FFUF JSON Parser Dashboard</h1>

      {/* File Upload Form */}
      <Row className="mb-4">
        <Col md={6} className="mx-auto">
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select FFUF JSON File</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Form.Group controlId="statusFilter" className="mb-3">
              <Form.Label>Filter by Status Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Status Code (e.g., 200)"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="minSizeFilter" className="mb-3">
              <Form.Label>Filter by Min Size</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Min Size"
                value={minSize}
                onChange={(e) => setMinSize(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="maxSizeFilter" className="mb-3">
              <Form.Label>Filter by Max Size</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Max Size"
                value={maxSize}
                onChange={(e) => setMaxSize(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleUpload}>
              Upload & Filter
            </Button>
          </Form>
        </Col>
      </Row>

      {/* Filtered Results Table */}
      {filteredData.length > 0 && (
        <Table striped bordered hover className="mt-5">
          <thead>
            <tr>
              <th>URL</th>
              <th>Status Code</th>
              <th>Response Size</th>
              <th>Response Data</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.url}</td>
                <td>{item.status}</td>
                <td>{item.length}</td>
                <td>{item.input.FUZZ ? item.input.FUZZ.substring(0, 50) : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default FileUpload;
