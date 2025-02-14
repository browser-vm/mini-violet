const express = require('express');
const { createBareServer } = require('@tomphttp/bare-server-node');
const { uvPath, codec } = require('@titaniumnetwork-dev/ultraviolet');
const path = require('path');

const app = express();
const bare = createBareServer('/bare/');
const port = process.env.PORT || 3000;

// Proxy endpoint
app.get('/proxy', (req, res) => {
  const target = req.query.url;
  if (!target) return res.status(400).send('Missing URL parameter');
  
  const encoded = codec.xor.encode(target);
  const proxyUrl = `${req.protocol}://${req.get('host')}/uv/${encoded}`;
  res.json({ url: proxyUrl });
});

// UV middleware
app.use('/uv', express.static(uvPath));

app.use(express.static(path.join(__dirname, 'frontend/build')));

// Handle all other routes by serving the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Proxy running on port ${port}`);
});
