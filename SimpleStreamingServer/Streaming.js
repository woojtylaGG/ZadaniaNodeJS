const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const fileName = queryObject.file;

    if (!fileName) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Bad Request: No file specified');
        return;
    }
}); 