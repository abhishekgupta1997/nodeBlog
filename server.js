//using node
const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req,res)=>{

    //set header content type
    res.setHeader('Content-Type','text/html');

    //routing
    let path = './views/';
    switch(req.url){
        case '/':
            path+= 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path+= 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location','/about');
            res.end();
            break;
        default:
            path+='404.html';
            res.statusCode = 404;
            break;
    }

    // res.write('<h3>hello, Mfs</h3>');
    // res.end();

    //send an html file 
    fs.readFile(path,(err,data) =>{
        if(err){
            console.log(err);
            res.end();
        } else{
            // res.write(data);
            // if we are writing only 1 data we can pass it to res.end
            res.end(data);
        }
    })
})

//server.listen(port no, localhost, callback f())
server.listen(3000,'localhost',() =>{
    console.log('listening for req on port 3000')
})