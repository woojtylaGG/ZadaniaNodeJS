const fs = require('fs');
const path = require('path');
const EventEmitter = require('events')

class FileAnalyzer extends EventEmitter{
    constructor(directoryPath) {
        super();
        this.directoryPath = directoryPath;
    }
    analyze(){
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
const directoryPath = process.argv[2];
if (!directoryPath) {
    console.error('Please provide a directory path as an argument.');
    process.exit(1);
}

const analyzer = new FileAnalyzer(directoryPath);

analyzer.on('analysisStarted', (dirPath) => {
    console.log(`Analysis started for directory: ${dirPath}`);
});

analyzer.on('fileAnalysisStarted', (filePath) => {
    console.log(`File analysis started for: ${filePath}`);
});

analyzer.on('fileAnalysisCompleted', (filePath) => {
    console.log(`File analysis completed for: ${filePath}`);
});

analyzer.on('analysisCompleted', (dirPath) => {
    console.log(`Analysis completed for directory: ${dirPath}`);
});

analyzer.analyze();