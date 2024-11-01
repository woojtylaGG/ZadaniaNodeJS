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
    if(fs.existsSync(filePath)){
        if (fs.existsSync(filePath)){
            const fileData = fs.readFileSync(filePath);
        data = JSON.parse(fileData);
        }
        data.push(newObject);
        fs.writeFileSync(filePath, JSON.stringify(data, null,2));
        console.log('Data added');
    }

}
