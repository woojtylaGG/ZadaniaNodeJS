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
                    if (stats.isFile()) {
                        if (eventType === 'rename' && !stats.isFile()) {
                            this.emit('deleted', filename);
                        } else if (eventType === 'rename' && stats.isFile()) {
                            this.emit('added', filename);
                        } else if (eventType === 'change') {
                            this.emit('changed', filename);
                        }
                    }
                    
                });
            }
        });
    }
    logChange(eventType, filename) {
        if (filename === this.logFile) return;

        const logMessage = `${new Date().toISOString()} - ${eventType}: ${filename}\n`;
        fs.appendFile(this.logFile, logMessage, (err) => {
            if (err) {
                console.error('Error logging change:', err);
            }
        });
    }
 
}
const directoryToWatch = 'D:\\RepoGithub\\ZadaniaNodeJS\\FileWatcher-MonitorFileChanges';
const watcher = new FileWatcher(directoryToWatch);

watcher.on('added', (filename) => {
    console.log(`File added: ${filename}`);
    watcher.logChange('added', filename);
});

watcher.on('changed', (filename) => {
    console.log(`File changed: ${filename}`);
    watcher.logChange('changed', filename);
});

watcher.on('deleted', (filename) => {
    console.log(`File deleted: ${filename}`);
});