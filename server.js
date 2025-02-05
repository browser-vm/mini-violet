const express = require('express');
const { createBareServer } = require('@tomphttp/bare-server-node');
const { uvPath, codec } = require('@titaniumnetwork-dev/ultraviolet');
const { publicPath } = require('ultraviolet-static');

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

// Static files and UV middleware
app.use(express.static(publicPath));
app.use('/uv', express.static(uvPath));

// Start server
app.listen(port, () => {
  console.log(`Proxy running on port ${port}`);
  console.log(`Access via: http://localhost:${port}/uv/service/${codec.xor.encode('https://example.com')}`);
});
