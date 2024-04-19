const http = require('http');
const PORT = 3000;

const server = http.createServer();

const friends = [
    {
        id:0,
        friend:'Isaac Newton'
    },
    {
        id:1,
        friend:'Nicola Tesla'
    }
];

server.on('request',(req,res)=>{

    const items = req.url.split('/');
    const url = items[1];
    const params = items[2];
    if(req.method === 'POST' && url === 'friends'){
        //request
        //fetch('http://localhost:3000/friends',{method:'POST',body:JSON.stringify({id:3,friend:'New Friend'})}).then((response)=>response.json()).then((friend)=>{console.log(friend)});
        req.on('data',(data)=>{
            const friend =JSON.parse(data.toString())
            friends.push(friend);
            console.log(friend);
        });
        req.pipe(res);
    }else if(req.method === 'GET' && url === 'friends'){

        res.writeHead(200,{'Content-type':'application/json'}); 
        
        if(items.length === 3){
            res.end(JSON.stringify(friends[Number(params)]));
        }else{
            res.end(JSON.stringify({friends:friends}));
        }
        
    }else if(url === 'messages'){
        res.writeHead(200,{'Content-type':'text/html'}); 
        res.write('<html><head><title</title></head>');
        res.write('<body>Hellow worlds!</body></html>');
        res.end();
    }else if(url === ''){
        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain');
        res.end('Index');
    }else{
        res.statusCode = 404;
        res.setHeader('Content-Type','text/plain');
        res.end('Page not found. Please try again.');
    }
 });
 




 server.listen(PORT,()=>{
     console.log(`Listening on port ${PORT}...`);
 });