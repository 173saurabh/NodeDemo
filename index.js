
//Printing Hello World in node.js.
// const hello = 'hello Saurabh';
// console.log(hello);


//* File System Module:-

//Synchronous way.
//!Synchronous type code. Each operation executes line by line.
//! Synchronous code also known as blocking code.
//? How to read a file

const fs = require('fs');
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

//? How to write in a file.

const textOut = `This is what we know about the avacado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt',textOut);
console.log('File written!');

//Asynchronous way.
//! Asynchronous(Non-blocking) code...
//? How to read a file

const fs = require('fs');
fs.readFile('./txt/input.txt', 'utf-8', (err, data) => {
    console.log(data);
});
console.log('Reading file...');