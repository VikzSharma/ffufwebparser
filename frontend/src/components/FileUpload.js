import React, { useState } from 'react';
import axios from '../services/api'; // Backend service
import { Container, Form, Button, Table, Row, Col } from 'react-bootstrap'; // Bootstrap components
import * as XLSX from 'xlsx';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [wordFilter, setWordFilter] = useState('');
  const [lineFilter, setLineFilter] = useState('');
  const [lengthFilter, setLengthFilter] = useState('');
  const [urlRegexFilter, setUrlRegexFilter] = useState('');
  const [currentFilters, setCurrentFilters] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const applyFilters = async () => {
    const formData = new FormData();
    formData.append('file', file);

    const query = new URLSearchParams({
      statusFilter,
      wordFilter,
      lineFilter,
      lengthFilter,
      urlRegexFilter
    }).toString();

    try {
      const response = await axios.post(`ffuf/upload?${query}`, formData);
      setFilteredData(response.data);
      setCurrentFilters({ statusFilter, wordFilter, lineFilter, lengthFilter, urlRegexFilter });
    } catch (error) {
      console.error('File upload error', error);
    }
  };

  const clearFilters = () => {
    setStatusFilter('');
    setWordFilter('');
    setLineFilter('');
    setLengthFilter('');
    setUrlRegexFilter('');
    setCurrentFilters(null);
    setFilteredData([]);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'FFUF Results');
    XLSX.writeFile(workbook, 'ffuf_results.xlsx');
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4 display-6"></h2>

      {/* Inline Form for Filters */}
      <Form>
        <Row className="align-items-center">
          <Col xs="auto">
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select FFUF JSON Output File</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
          </Col>
          <Col xs="auto">
            <Form.Group controlId="statusFilter">
              <Form.Label>Filter by Status Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Status Code"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs="auto">
            <Form.Group controlId="wordFilter">
              <Form.Label>Filter by Words</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Words"
                value={wordFilter}
                onChange={(e) => setWordFilter(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs="auto">
            <Form.Group controlId="lineFilter">
              <Form.Label>Filter by Lines</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Min Lines"
                value={lineFilter}
                onChange={(e) => setLineFilter(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs="auto">
            <Form.Group controlId="lengthFilter">
              <Form.Label>Filter by Length</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Min Length"
                value={lengthFilter}
                onChange={(e) => setLengthFilter(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs="auto">
            <Form.Group controlId="urlRegexFilter">
              <Form.Label>Filter URL using Regex</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter URL Regex"
                value={urlRegexFilter}
                onChange={(e) => setUrlRegexFilter(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs="auto">
            <Button variant="primary" onClick={applyFilters}>Apply Filters</Button>
            <Button variant="warning" onClick={clearFilters}>Clear Filters</Button>
            <Button variant="success" onClick={exportToExcel}>Export to Excel</Button>
          </Col>
        </Row>
      </Form>

      {/* Display Current Filters */}
      {currentFilters && (
        <div className="current-filters mt-3">
          <p><strong>Current Filters:</strong> {JSON.stringify(currentFilters)}</p>
        </div>
      )}

      {/* Responsive Table */}
      {filteredData.length > 0 && (
        <div className="table-responsive">
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
                  {/* Enable horizontal scrolling in the URL cell */}
                  <td>
                    <div className="scrollable-url">{item.url}</div>
                  </td>
                  <td>{item.status}</td>
                  <td>{item.length}</td>
                  <td>{item.input.FUZZ ? item.input.FUZZ.substring(0, 50) : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default FileUpload;
