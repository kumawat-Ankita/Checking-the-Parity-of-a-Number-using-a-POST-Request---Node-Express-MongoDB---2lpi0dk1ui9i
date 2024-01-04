const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/') {
    let body = '';
    
    req.on('data', (chunk) => {
      body += chunk.toString(); // Accumulate the data from the request
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        if (data && typeof data.num1 === 'number') {
          const num = data.num1;
          if (num % 2 === 0) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`The number ${num} is even`);
          } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(`The number ${num} is odd`);
          }
        } else {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Invalid payload. Please provide a valid JSON with a numeric "num1" field.');
        }
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Error parsing JSON data.');
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Invalid endpoint or method.');
  }
});

module.exports = server;
