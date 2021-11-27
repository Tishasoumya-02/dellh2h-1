const express = require('express');
const router = express.Router();
const structjson = require('./structjson');
const dialogflow = require('dialogflow');
const uuid = require('uuid');
const config = require('../config/keys');

const Order=require('../model/data')

const validator = require("email-validator");
 

const projectId = config.googleProjectID
const sessionId = config.dialogFlowSessionID
const languageCode = config.dialogFlowSessionLanguageCode


// Create a new session
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// We will make two routes 


// Text Query Route

router.post('/textQuery', async (req, res) => {
    //We need to send some information that comes from the client to Dialogflow API 
    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: req.body.text,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);

    res.send(result)
})



//Event Query Route

router.post('/eventQuery', async (req, res) => {
    //We need to send some information that comes from the client to Dialogflow API 
    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            event: {
                // The query to send to the dialogflow agent
                name: req.body.event,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },
    };
 
    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);

    res.send(result)
})


// APIs for orders
// router.post('/get-order-details',async (req,res)=>{
    
//     try{
//         const orderId=req.body.orderId;
//         const orderData=await Order.findOne({orderId:orderId})
//         console.log(orderId)
        

//         if(orderData){
//             if(orderData.email && orderData.zipcode && orderData.date && validator.validate(orderData.email)){
//               console.log("success")
//                     // return res.status(201).json({orderData,success:true});
//             }
//             else{
               
//                 // return res.status(201).json({orderData,success:false});
//             }
//         }
//         else{
            
//             // return res.status(404).json({success:false,message:"No such order found"});
//         }
       
    
//     }
//     catch{
//         res.json({message : "Error from the server"})
//     }
// })








module.exports = router;
