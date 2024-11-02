const fs = require('fs');
const EventEmitter = require('events');

class FileWatcher extends EventEmitter {
    constructor(directoryToWatch, logFile = 'fileWatcher.log') {
        super();
        this.directoryToWatch = directoryToWatch;
        this.logFile = logFile;
        this.watch();
    }
}