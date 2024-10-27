const fs = require('fs').promises;
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (question) => {
  return new Promise((resolve) => rl.question(question, resolve));
};
async function dataLogger(){
  const firstName = await askQuestion("Podaj imię: ");
  const lastName = await askQuestion("Podaj nazwisko: ");
  const age = await askQuestion("Podaj wiek: ");

  const userData = {
    firstName,
    lastName,
    age: Number(age)
  };
}
