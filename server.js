const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png'
};

const server = http.createServer((req, res) => {
    let filePath = ''
    if(req.url === '/'){
        filePath = './web/index.html';
    }
    else{
        filePath = './web' + req.url;
    }

    const ext = path.extname(filePath);

    fs.readFile(filePath, (err, content) => {
        if (err){
            res.writeHead(404);
            res.end('404 Not Found');
            return;
        }
        res.writeHead(200, {'Content-Type': mimeTypes[ext]});
        res.end(content);
    })
});

server.listen(3000, () => {
    console.log("Server started on port 3000");
});