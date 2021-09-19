const fs = require('fs');
const http = require('http');
const url = require('url');



////////////////////////////////////////////////////////////////////////////////
//* File System Module:-


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
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {

//     if(err) { return console.log("Error! ⚡")}
    
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);

//             //? Writting on a file.
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log('Your file has been written 😋');
//             })
//         });
//     });
// });
// console.log("Will read file....");


/////////////////////////////////////////////////////////////////////////
//* Server Module:-

const replaceTemplate = (temp , product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.image);
    output = output.replace(/{%FROM%}/g, product.image);
    output = output.replace(/{%NUTRIENTS%}/g, product.image);
    output = output.replace(/{%QUANTITY%}/g, product.image);
    output = output.replace(/{%DESCRIPTION%}/g, product.image);
    output = output.replace(/{%ID%}/g, product.image);
    if(!product.organic)
        output = output.replace(/{%NOT_ORGANIC%}/g, product.image);
    return output;
}



const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);



const server = http.createServer((req, res) => {
    //console.log(req);
    //console.log(req.url);

    const patName =req.url;

    //Overview Page.
    if(patName === '/' || patName === '/overview'){
        res.writeHead(200 , { 'Content-Type': 'text/html'});
        const cardsHtml = dataObj.map(el =>replaceTemplate(tempCard,el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        //console.log(cardsHtml);
        res.end(output);
    }

    //Product Page.
    else if(patName === '/product'){
        res.end('This is the PRODUCT!');
    }

    //Api
    else if(patName === '/api')
    {
        /*fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
            const productData = JSON.parse(data);
            // console.log(productData);
            res.writeHead(200 , { 'Content-Type': 'application/json'});
            res.end(data);
        });*/
        res.writeHead(200 , { 'Content-Type': 'application/json'});
        res.end(data);
        //res.end('API');
    }

    //Not found
    else {
        res.writeHead(404,{
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found!</h1>');
    }
    // res.end('Hello from the server!');
});
server.listen(8080, '127.0.0.1', () => {
    console.log('Listening to requests on port 8080');
});