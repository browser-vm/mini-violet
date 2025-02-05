import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProxyResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [copySuccess, setCopySuccess] = useState('');
  const proxiedUrl = location.state?.proxiedUrl;

  // Handle "Copy to Clipboard" functionality
  const handleCopy = () => {
    if (proxiedUrl) {
      navigator.clipboard.writeText(proxiedUrl)
        .then(() => {
          setCopySuccess('URL copied to clipboard!');
          setTimeout(() => setCopySuccess(''), 3000); // Clear message after 3 seconds
        })
        .catch(() => {
          setCopySuccess('Failed to copy URL.');
          setTimeout(() => setCopySuccess(''), 3000);
        });
    }
  };

  // Handle case where no URL is provided
  if (!proxiedUrl) {
    return (
      <div className="proxy-result-container">
        <h2>No URL Found</h2>
        <p>It seems like you navigated here without providing a URL to proxy.</p>
        <button onClick={() => navigate('/')} className="back-button">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="proxy-result-container">
      <h2>Proxied URL</h2>
      <div className="url-display">
        <p>{proxiedUrl}</p>
        <button onClick={handleCopy} className="copy-button">
          Copy to Clipboard
        </button>
      </div>
      {copySuccess && <p className="copy-success-message">{copySuccess}</p>}
    </div>
  );
};

export default ProxyResult;
