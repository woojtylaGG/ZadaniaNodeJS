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
    async function main() {
        try {
            const num1 = parseFloat(await askQuestion('Enter the first number: '));
            const num2 = parseFloat(await askQuestion('Enter the second number: '));
            const operation = await askQuestion('Enter the operation (add/multiply): ');
            const method = await askQuestion('Enter the method (callback/promise): ');
    
            if (isNaN(num1) || isNaN(num2)) {
                throw new Error('Invalid number input');
            }
    
            if (operation !== 'add' && operation !== 'multiply') {
                throw new Error('Invalid operation');
            }
    
            if (method !== 'callback' && method !== 'promise') {
                throw new Error('Invalid method');
            }
    
            if (method === 'callback') {
                if (operation === 'add') {
                    add(num1, num2, (err, result) => {
                        if (err) throw err;
                        console.log(`Result: ${result}`);
                        rl.close();
                    });
                } else {
                    multiply(num1, num2, (err, result) => {
                        if (err) throw err;
                        console.log(`Result: ${result}`);
                        rl.close();
                    });
                }
            } else {
                if (operation === 'add') {
                    const result = await addPromise(num1, num2);
                    console.log(`Result: ${result}`);
                } else {
                    const result = await multiplyPromise(num1, num2);
                    console.log(`Result: ${result}`);
                }
                rl.close();
            }
        } catch (error) {
            console.error(`Error: ${error.message}`);
            rl.close();
        }
    }
    
    main();