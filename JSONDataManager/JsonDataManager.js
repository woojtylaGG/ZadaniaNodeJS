const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function askQuestion(query){
    return new Promise((resolve) => rl.question(query, resolve));
}

async function addNewObject(filePath){
    const name = await askQuestion('Enter name: ');
    const age = await askQuestion('Enter age: ');
    const email = await askQuestion('Enter email: ');
    const newObject = {
        name,
        age,
        email
    };
    let data = [];
        if (fs.existsSync(filePath)){
        const fileData = fs.readFileSync(filePath);
        data = JSON.parse(fileData);
        }
        data.push(newObject);
        fs.writeFileSync(filePath, JSON.stringify(data, null,2));
        console.log('Data added');
    }
    async function displayData(filePath) {
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath);
            const data = JSON.parse(fileData);
            console.log(data);
        } else {
            console.log('File does not exist.');
        }
    }
    async function main() {
        const action = await askQuestion('Do you want to add a new object or display data? (add/display): ');
    
        const filePath = await askQuestion('Enter the path to the JSON file: ');
    
        if (action === 'add') {
            await addNewObject(filePath);
        } else if (action === 'display') {
            await displayData(filePath);
        } else {
            console.log('Invalid action.');
        }
    
        rl.close();
    }
    
    main();