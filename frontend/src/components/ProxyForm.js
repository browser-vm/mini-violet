import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProxyForm = () => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Validate URL using a regular expression
  const isValidUrl = (input) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-zA-Z\\d_]*)?$',
      'i'
    );
    return !!urlPattern.test(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error state
    setError('');

    // Validate the URL
    if (!isValidUrl(url)) {
      setError('Please enter a valid URL.');
      return;
    }

    try {
      // Send the URL to the backend
      const response = await fetch(`/proxy?url=${encodeURIComponent(url)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch the proxied URL.');
      }

      const data = await response.json();
      if (data.url) {
        // Navigate to the result page with the proxied URL
        navigate('/result', { state: { proxiedUrl: data.url } });
      } else {
        throw new Error('Invalid response from the server.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while processing your request.');
    }
  };

  return (
    <div className="proxy-form-container">
      <h2>Enter a URL to Proxy</h2>
      <form onSubmit={handleSubmit} className="proxy-form">
        <div className="form-group">
          <label htmlFor="url">URL:</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className={`form-input ${error ? 'input-error' : ''}`}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">
          Proxy URL
        </button>
      </form>
    </div>
  );
};

export default ProxyForm;
