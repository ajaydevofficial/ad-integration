const express = require('express')
const app = express();
const axios = require('axios');
const fbusiness = require('facebook-nodejs-business-sdk');



app.get('/connect/:userId/:token',(request,response)=>{

    response.header("Access-Control-Allow-Origin", "*");

    //Code from Facebook Business SDK website

    const accessToken = request.params.token;
    const userId = request.params.userId;

    const api = fbusiness.FacebookAdsApi.init(accessToken); //Initialize facebook business api


    const GraphApiUrl = "https://graph.facebook.com/v6.0/" + userId + "/adaccounts?access_token=" + accessToken;

    

    axios.get(GraphApiUrl).then((value)=>{
        adAccountList = [];
        responseList = [];
        let data = value.data.data
        data.forEach(element => {
            adAccountList.push(element.id);
        });
        adAccountList.forEach(adAccountID=>{
            const AdAccount = fbusiness.AdAccount;
            const Campaign = fbusiness.Campaign;
            const account = new AdAccount(adAccountID);
                
            account.read([AdAccount.Fields.name])
            .then((acc) =>{
                console.log(JSON.stringify(acc.getCampaigns()))
            });
        })
    },(error)=>{
        console.log('Error: ',error);
    })

});

app.get('/',(request,response)=>{
    response.send('Welcome to Node server');
});

app.listen(8000,()=>{
    console.log('Server running at port 8000')
})
