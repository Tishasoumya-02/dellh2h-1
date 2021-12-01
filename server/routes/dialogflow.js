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



const fs = require('fs');
const moment = require('moment');
const mdq = require('mongo-date-query');
const json2csv = require('json2csv').parse;
const path = require('path')
const fields = ['date', 'holdCount','successCount'];


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
            const _id=countData[0]._id
            if(!orderData.email || !validator.validate(orderData.email)){
                if(countData){
                    console.log(countData)
                }
                if(countData){
                    const filter = { date: countData[0].date };
                    console.log(countData[0])
                    let holds=countData[0].holdCount;


                    var count={
                        date:countData[0].date,
                        holdCount:holds+1,
                        successCount:countData[0].successCount
                    }

                    Count.findOneAndUpdate(filter,count,{new:true},function(err,count){
                        if (err) {
                            console.log("err", err);
                            
                          } else {
                            console.log(countData[0].holdCount);
                          }
                    })


                }
                else{
                    console.log("not present")
                    const count=new Count({
                        date:orderData.date,
                        holdCount:1,
                        successCount:0
                    })
                    const result=await count.save();

                }

                
                return res.status(201).json({orderData,success:false,faulty:"email"});
            }
            else if(!orderData.zipcode || orderData.zipcode<1000){
                if(countData){
                    console.log(countData)
                }
                if(countData){
                    const filter = { date: countData[0].date };
                    console.log(countData[0])
                    let holds=countData[0].holdCount;


                    var count={
                        date:countData[0].date,
                        holdCount:holds+1,
                        successCount:countData[0].successCount
                    }

                    Count.findOneAndUpdate(filter,count,{new:true},function(err,count){
                        if (err) {
                            console.log("err", err);
                            
                          } else {
                            console.log(countData[0].holdCount);
                          }
                    })


                }
                else{
                    console.log("not present")
                    const count=new Count({
                        date:orderData.date,
                        holdCount:1,
                        successCount:0
                    })
                    const result=await count.save();

                }
               
                return res.status(201).json({orderData,success:false,faulty:"zipcode"});
            }
            else if(!orderData.date){
                if(countData){
                    console.log(countData)
                }
                if(countData){
                    const filter = { date: countData[0].date };
                    console.log(countData[0])
                    let holds=countData[0].holdCount;


                    var count={
                        date:countData[0].date,
                        holdCount:holds+1,
                        successCount:countData[0].successCount
                    }

                    Count.findOneAndUpdate(filter,count,{new:true},function(err,count){
                        if (err) {
                            console.log("err", err);
                            
                          } else {
                            console.log(countData[0].holdCount);
                          }
                    })


                }
                else{
                    console.log("not present")
                    const count=new Count({
                        date:orderData.date,
                        holdCount:1,
                        successCount:0
                    })
                    const result=await count.save();

                }
                
                return res.status(201).json({orderData,success:false,faulty:"date"});
            }
            else{
                    console.log("success")
                    if(countData){
                        console.log(countData)
                    }
                    if(countData){
                        const filter = { date: countData[0].date };
                        console.log(countData[0])
                        let holds=countData[0].holdCount;
                        let s=countData[0].successCount;
    
                        var count={
                            date:countData[0].date,
                            holdCount:holds,
                            successCount:s+1
                        }
    
                        Count.findOneAndUpdate(filter,count,{new:true},function(err,count){
                            if (err) {
                                console.log("err", err);
                                
                              } else {
                                console.log(countData[0].holdCount);
                              }
                        })
    
    
                    }
                    else{
                        console.log("not present")
                        const count=new Count({
                            date:orderData.date,
                            holdCount:0,
                            successCount:1
                        })
                        const result=await count.save();
    
                    }
                    
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
            email:req.body.email && req.body.email,
            date:req.body.date && req.body.date
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



//admin apis

router.delete('/delete-order',async (req,res)=>{
    try{
        const orderId=req.body.orderId;
        const orderData=await Order.findOne({orderId:orderId})
        if(orderData){
            Order.deleteOne({orderId:orderId},function(err){
                if(err){
                    res.status(201).json({success:false})
                }
                else{
                    res.status(201).json({success:true})
                }
            })
        }
        else{
            res.status(201).json({message:"No such order found",success:false})
        }
    }
    catch{
        res.status(500).json({message : "Error from the server"})
    }
})


router.get('/get-count',async (req,res)=>{
    try{
        Count.find({}, function(err, c) {
            var cMap = {};
        
            c.forEach(function(count) {
              cMap[count.date] = count;
            });
            
            res.send(cMap);  
          });
    }
    catch{
        res.status(500).json({message : "Error from the server"})
    }
})


router.get('/download-data',(req,res)=>{
    Count.find({}, function (err, count) {
        if (err) {
          return res.status(500).json({ err });
        }
        else {
          let csv
          try {
            csv = json2csv(count, { fields });
          } catch (err) {
            return res.status(500).json({ err });
          }
          const dateTime = moment().format('YYYYMMDDhhmmss');
          const filePath = path.join(__dirname, "..","csv-" + dateTime + ".csv")
          fs.writeFile(filePath, csv, function (err) {
            if (err) {
              return res.json(err).status(500);
            }
            else {
            //   setTimeout(function () {
            //     fs.unlinkSync(filePath); // delete this file after 30 seconds
            //   }, 30000)
              return res.json("/csv-" + dateTime + ".csv");
            }
          });
    
        }
      })
})







module.exports = router;
