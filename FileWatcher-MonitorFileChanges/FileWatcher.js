const fs = require('fs');
const EventEmitter = require('events');

class FileWatcher extends EventEmitter {
    constructor(directoryToWatch, logFile = 'fileWatcher.log') {
        super();
        this.directoryToWatch = directoryToWatch;
        this.logFile = logFile;
        this.watch();
    }
    watch() {
        fs.watch(this.directoryToWatch, (eventType, filename) => {
            if (filename && filename !== this.logFile) {
                fs.stat(`${this.directoryToWatch}/${filename}`, (err, stats) => {
                    if (err) {
                        console.error('Error stating file:', err);
                        return;
                    }
                    
                });
            }
        });
    }
}
