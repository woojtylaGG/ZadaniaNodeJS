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
    const filePath = `./${fileName}`;

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File Not Found');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
    });
}); 
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});