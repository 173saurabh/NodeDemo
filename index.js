
//Printing Hello World in node.js.
// const hello = 'hello Saurabh';
// console.log(hello);


//* File System Module:-

const fs = require('fs');

//Synchronous way.
//!Synchronous type code. Each operation executes line by line.
//! Synchronous code also known as blocking code.
//? How to read a file


// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// //? How to write in a file.

// const textOut = `This is what we know about the avacado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt',textOut);
// console.log('File written!');

//Asynchronous way.
//! Asynchronous(Non-blocking) code...
//? How to read a file

// fs.readFile('./txt/input.txt', 'utf-8', (err, data) => {
//     console.log(data);
// });
// console.log('Reading file...');


//? Reading a file...
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {

    if(err) { return console.log("Error! ⚡")}
    
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
            console.log(data3);

            //? Writting on a file.
            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
                console.log('Your file has been written 😋');
            })
        });
    });
});
console.log("Will read file....");