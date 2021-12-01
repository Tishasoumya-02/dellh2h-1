const express = require('express');
const router = express.Router();
const structjson = require('./structjson');
const dialogflow = require('dialogflow');
const uuid = require('uuid');
const config = require('../config/keys');

const Order=require('../model/data')
const Count=require('../model/count')

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
router.post('/get-order-details',async (req,res)=>{
    
    try{
        const orderId=req.body.orderId;
        const orderData=await Order.findOne({orderId:orderId})
        console.log(orderId)

        if(orderData){


            const countData=await Count.find({date:orderData.date});
            const _id=countData._id
            if(!orderData.email || !validator.validate(orderData.email)){
                // if(countData){
                //     console.log(countData)
                // }
                // if(countData){
                //     let holds=countData.holdCount;


                //     var count={
                //         date:countData.date,
                //         holdCount:2,
                //         successCount:countData.successCount
                //     }

                //     Count.findByIdAndUpdate(_id,count,{new:true},function(err,count){
                //         if (err) {
                //             console.log("err", err);
                            
                //           } else {
                //             console.log(countData.holdCount);
                //           }
                //     })


                // }
                // else{
                //     var count=new Count({
                //         date:orderData.date,
                //         holdCount:1,
                //         successCount:0
                //     })
                //     const result=await count.save();

                // }

                
                return res.status(201).json({orderData,success:false,faulty:"email"});
            }
            else if(!orderData.zipcode || orderData.zipcode.length<4){
               
                return res.status(201).json({orderData,success:false,faulty:"zipcode"});
            }
            else if(!orderData.date){
                
                
                return res.status(201).json({orderData,success:false,faulty:"date"});
            }
            else{
                    console.log("success")
                    
                    return res.status(201).json({orderData,success:true});
            }
            
        }
        else{
            
            return res.status(404).json({success:false,message:"No such order found"});
        }
       
    
    }
    catch{
        res.json({message : "Error from the server"})
    }
})

// router.post('/get-order-details',async (req,res)=>{
    
//     try{
//         const orderId=req.body.orderId;
//         const orderData=await Order.findOne({orderId:orderId})
//         console.log(orderId)
//         if(orderData){
//             const countData=await Count.findOne({date:orderData.date});
//             if(!orderData.email || !validator.validate(orderData.email)){
         
              
//                 return res.status(201).json({orderData,success:false,faulty:"email"});
//             }
//             else if(!orderData.zipcode || orderData.zipcode.length<4){
         
//                 return res.status(201).json({orderData,success:false,faulty:"zipcode"});
//             }
//             else if(!orderData.date){
             
//                 return res.status(201).json({orderData,success:false,faulty:"date"});
//             }
//             else{
               
//                     return res.status(201).json({orderData,success:true});
//             }
            
//         }
//         else{
            
//             return res.status(404).json({success:false,message:"No such order found"});
//         }
       
    
//     }
//     catch{
//         res.json({message : "Error from the server"})
//     }
// })


router.post('/update-order',async (req,res)=>{
    try{
        const _id=req.body._id;
        const filter = { orderId: req.body.orderId };
        console.log(_id)
        var order={
            orderId:req.body.orderId,
            zipcode:req.body.zipcode && req.body.zipcode,
            email:req.body.zipcode && req.body.email,
            date:req.body.zipcode && req.body.date
        }


        Order.findOneAndUpdate(filter,order,{new:true},function(err,order){
            if (err) {
                console.log("err", err);
                res.status(500).json({success:false});
              } else {
                console.log("success");
                res.status(201).json({success:true});
              }
        })
    }
    catch{
        res.status(500).json({message : "Error from the server"})
    }
})








module.exports = router;
