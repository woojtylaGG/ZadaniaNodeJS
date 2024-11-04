const fs = require('fs');
const path = require('path');
const EventEmitter = require('events')

class FileAnalyzer extends EventEmitter{
    constructor(directoryPath) {
        super();
        this.directoryPath = directoryPath;
    }
    analyze(){
        this.emit('analisysStarted', this.directoryPath);
        this.emit('analysisStarted', this.directoryPath);
        fs.readdir(this.directoryPath, (err, files) => {
            files.forEach(file => {
                const filePath = path.join(this.directoryPath, file);
                fs.stat(filePath, (err, stats) => {
                    if (stats.isFile()) {
                        this.emit('fileAnalysisStarted', filePath);
                        console.log(`File: ${file}`);
                        console.log(`Size: ${stats.size} bytes`);
                        console.log(`Extension: ${path.extname(file)}`);
                        console.log(`Last Modified: ${stats.mtime}`);
                        this.emit('fileAnalysisCompleted', filePath);
                    } else if (stats.isDirectory()) {
                        console.log(`Directory: ${file}`);
                    }
                });
            });
            this.emit('analysisCompleted', this.directoryPath);
        });
    }
}