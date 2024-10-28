const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    });

    function askQuestion(query){
        return new Promise((resolve) => rl.question(query, resolve));
    }
    function add(a, b, callback) {
        setTimeout(() => {
            callback(null, a + b);
        }, 1000);
    }
    function multiply(a, b, callback) {
        setTimeout(() => {
            callback(null, a * b);
        }, 1000);
    }
    function addPromise(a, b) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(a + b);
            }, 1000);
        });
    }
    function multiplyPromise(a, b) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(a * b);
            }, 1000);
        });
    }
    