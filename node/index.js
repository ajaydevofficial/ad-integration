const express = require('express')
const app = express();
const https = require('https'); 

app.get('/connect/:token',(request,response)=>{
    const token = request.params.token
    console.log(token)
    response.header("Access-Control-Allow-Origin", "*");
    response.end(JSON.stringify({tokenVal:token}))
});

app.get('/',(request,response)=>{
    response.send('Welcome to Node Server');
});

app.listen(8000,()=>{
    console.log('Server running at port 8000')
})