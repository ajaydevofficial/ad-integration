const express = require('express')
const app = express();
const axios = require('axios');
const fbusiness = require('facebook-nodejs-business-sdk');
const Promise = require('promise')
const asyncForEach = require('async-foreach').forEach;
const async = require('async')


app.get('/connect/:userId/:token',(request,response)=>{

    response.header("Access-Control-Allow-Origin", "*");

    //Code from Facebook Business SDK website

    const accessToken = request.params.token;
    const userId = request.params.userId;

    const api = fbusiness.FacebookAdsApi.init(accessToken); //Initialize facebook business api


    const GraphApiUrl = "https://graph.facebook.com/v6.0/" + userId + "/adaccounts?access_token=" + "EAAVMfKDNQcsBALCZC6cnR9pbHlGUoWrdKZAuX8LJyp9zse8EUskfaSMqVDMIwH8r9Fb4DlWJLZBJbprxV3oEKdB3ZBeEGEJgAqjQXbkZBF2UCUdKNHQIcZCR2BZC7D93W7arL5nS89d6oYRqYTvVZAnc56QT4DQ7RUj2neYkK78kivKVvpHvaTETZAZCiJg32ZBFzcZD";

    

    axios.get(GraphApiUrl).then((value)=>{

        adAccountList = [];
        responseList = [];
        let data = value.data.data;

        asyncForEach(data,function(element){
            adAccountList.push(element.id);
        });

        adAccountLength = adAccountList.length;
        loopStart = 1;
        asyncForEach(adAccountList,function(adAccountID){

            const AdAccount = fbusiness.AdAccount;
            const Campaign = fbusiness.Campaign;
            const account = new AdAccount(adAccountID);
            
            account.read([AdAccount.Fields.name])
            .then((account) =>{
                return account.getCampaigns([
                    Campaign.Fields.account_id,
                    Campaign.Fields.adlabels,
                    Campaign.Fields.bid_strategy,
                    Campaign.Fields.boosted_object_id,
                    Campaign.Fields.brand_lift_studies,
                    Campaign.Fields.budget_rebalance_flag,
                    Campaign.Fields.budget_remaining,
                    Campaign.Fields.buying_type,
                    Campaign.Fields.can_create_brand_lift_study,
                    Campaign.Fields.can_use_spend_cap,
                    Campaign.Fields.configured_status,
                    Campaign.Fields.created_time,
                    Campaign.Fields.daily_budget,
                    Campaign.Fields.effective_status,
                    Campaign.Fields.id,
                    Campaign.Fields.issues_info,
                    Campaign.Fields.last_budget_toggling_time,
                    Campaign.Fields.lifetime_budget,
                    Campaign.Fields.name,
                    Campaign.Fields.objective,
                    Campaign.Fields.pacing_type,
                    Campaign.Fields.promoted_object,
                    Campaign.Fields.recommendations,
                    Campaign.Fields.source_campaign,
                    Campaign.Fields.source_campaign_id,
                    Campaign.Fields.special_ad_category,
                    Campaign.Fields.spend_cap,
                    Campaign.Fields.start_time,
                    Campaign.Fields.status,
                    Campaign.Fields.stop_time,
                    Campaign.Fields.topline_id,
                    Campaign.Fields.updated_time

                ]) // fields array and params
            })
            .then((result) =>{
                campaigns = result
                
                asyncForEach(campaigns,function(campaign){
                    responseList.push(campaign._data);
                });

                loopStart++;

                if(loopStart>adAccountLength){
                    response.end(JSON.stringify(responseList))
                }
            }).catch(console.error);
            
            
            
        });
  
    },(error)=>{
        console.log('Error: ',error);
    });

    

});

app.get('/',(request,response)=>{
    response.send('Welcome to Node server');
});

app.listen(8000,()=>{
    console.log('Server running at port 8000')
});
