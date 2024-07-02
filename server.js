//Importing required modules to create a web server
const http = require('http');
//Importing the required 'fs' (file system) module to handle fill operations
const fs =  require('fs');

//creating an http server

const server = http.createServer((req, res) => {
    //checking if the request URL is the root URL or '/home'
    if (req.url === '/' || req.url === '/home') {
        //setting the response header to indicate the content type as HTML
        res.writeHead(200, { 'Content-Type': 'text/html' });
        // reading the 'index.html' file from the filesystem
        fs.readFile('./index.html', null, function(error, data) {
            if (error) {
                // If there's an error reading the file, respond with a 404 status and an error message
                res.writeHead(404);
                res.write('Error 404: Page not found');
            } else {
                //If the file is read successfully, write the file content to the response 
                res.write(data);
            }
            res.end('Home page'); 
        });
    } else if (req.url === '/api') {
        //checking if the response url is '/api'
        // Creating a JSON object to send as a response
        const responseData = {
            message: 'Hello',
        };
        //setting the response header to indicate that the content type is JSON
        res.writeHead(200, { 'Content-Type': 'application/json' });
        // for any other url, respond with a 404 status and error message
        res.end(JSON.stringify(responseData));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found!');
    }
});
//Defining port number to listen on
const port = 3000;  

//start the server on the specificed port
server.listen(port, () => {  
console.log(`Server running at http://localhost:${port}/`);  
});
