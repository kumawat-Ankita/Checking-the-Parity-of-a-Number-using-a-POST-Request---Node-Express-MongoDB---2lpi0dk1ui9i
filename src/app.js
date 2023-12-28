const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    const chunks = [];

    req.on('data', chunk => {
      const buf = Buffer.from(chunk);
      const str = buf.toString();
      chunks.push(str);
      const obj = JSON.parse(chunks)
      const value = obj.num1;
    
    if(isNan(value)){
      res.writeHead(404,{'Content-Type': 'text/plain'});
      res.end('Not a number');
    }else{
      if(value %2 === 0){
        res.writeHead(200,{'Content-Type': 'text/plain'});
        res.end('Even');
      }else{
        res.writeHead(200,{'Content-Type': 'text/plain'});
        res.end('Odd');
      }
    }
   });
  }

  
});


module.exports = server;
