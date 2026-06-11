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
    if (req.url === '/') {
        console.log("New Connection from", req.socket.remoteAddress);
        filePath = './web/index.html';
    } else if (req.url === '/api/update') {
        let notes = [];

        let response = fetch("http://localhost:5000/").then(response => response.json()).then(data => {
            for (let i = 0; i < data.length; i++) {
                notes.push([data[i].Title, data[i].Content, data[i].NoteId]);
            }

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(notes));
        })
            .catch(err => console.log(err));

        return;
    }
    else if (req.url === '/api/remove') {
        console.log("Remove yourself");
        let data = '';
        req.on('data', chunk => {
            data += chunk.toString();
        });
        req.on('end', () => {
            removeNote(data);
        });

        res.writeHead(202);
        res.end("Request beeing proccesed");
        return;
    }
    else {
        filePath = './web' + req.url;
    }

    const ext = path.extname(filePath);

    fs.readFile(filePath, (err, content) => {
        if (err) {
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

function removeNote(id) {
    console.log("Remove this id:", id);
}