const http = require('http'),
  fs = require('fs'),
  url = require('url');

// Creates the server

http.createServer((request, response) => {
  // Get the URL from the requestdD
  let addr = request.url,
  // Apply the class URL in the addr, parsed URL
  q = new URL(addr,  'http://' + request.headers.host);
  // path of the file
  filePath = '';

  // log of recent requests made to the server
  
  // log.txt will have the information, Second argument: The new information to be appended, third argument:  an error-handling function

  fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Added to log.');
    }
  });

  // The pathname is the part that comes immediately after the first '/'

  if (q.pathname.includes('documentation')) {
  //  __dirname is a module-specific variable that provides the path to the current directory 
  filePath = (__dirname + '/documentation.html');
  } 
  else {
  // if the URL doesn't exist on the server, they'll simply be returned to the main page.
  filePath = 'index.html';
  }
  // Sends the information
  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw err;
    }

    response.writeHead(200, { 'Content-Type': 'text/html' });
    // The data
    response.write(data);
    response.end();

  });
// Port
}).listen(8080);
console.log('My test server is running on Port 8080.');  