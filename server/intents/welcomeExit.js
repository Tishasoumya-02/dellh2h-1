
const Order=require('../model/data');
const validator = require("email-validator");
const Count=require('../model/count');
const fields = ['date', 'holdCount','successCount'];
const fs = require('fs');
const moment = require('moment');
const mdq = require('mongo-date-query');
const json2csv = require('json2csv').parse;
const path = require('path')
var updateparameter=null;
var updateorder=null;
async function  defaultFallback (agent) {


    const word=agent.parameters.number;
    const orderId=word;
    const orderData=await Order.findOne({orderId:orderId})
    console.log(orderId)

    if(orderData){

        const countData=await Count.find({date:orderData.date});
        const _id=countData[0]._id;

        updateorder=orderData;
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
            
           updateparameter="email";
            return agent.add(`Hey! Your order is as of now on HOLD. You need to update your email. ORDER details are as follows
            OrderID-${orderData.orderId} \n
            Zipcode-${orderData.zipcode}\n
            Email-${orderData.email}\n
            Date-${orderData.date}\n Do you want to update your email?`);
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
           
            updateparameter="zipcode";
            return agent.add(`Hey! Your order is as of now on HOLD. You need to update your Zipcode. ORDER details are as follows
            OrderID-${orderData.orderId}\n
            Zipcode-${orderData.zipcode}\n
            Email-${orderData.email}\n
            Date-${orderData.date} Do you want to update your Zipcode? `);
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
            
            updateparameter="date";
        
            return agent.add(`Hey! Your order is as of now on HOLD. You need to update your Date. ORDER details are as follows
            OrderID-${orderData.orderId}
            Zipcode-${orderData.zipcode}
            Email-${orderData.email}
            Date-${orderData.date}  Do you want to update the Date?`);
        }
        else{
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
                return   agent.add(`Hey! Your order is SUCCESS. ORDER details are as follows
                OrderID-${orderData.orderId}
                Zipcode-${orderData.zipcode}
                Email-${orderData.email}
                Date-${orderData.date} Do you want to update any information`);
        }
        
    }
    else{
        
        return  agent.add("failed");;
    }
}
async function  yesupdate (agent) {
    
const word=agent.parameters.Updatevalue;
console.log(updateorder._id);
console.log(updateparameter);
console.log(word);
const filter = { orderId: updateorder.orderId };
if(updateparameter==='email')
{
    var order={
        orderId:updateorder.orderId,
        email:word && word,
    }
}
if(updateparameter==='zipcode')
{
    var order={
        orderId:updateorder.orderId,
        zipcode:parseInt(word) && parseInt(word),
    }
}
Order.findOneAndUpdate(filter,order,{new:true},function(err,order){
    if (err) {
        console.log("err", err);
        // res.status(500).json({success:false});
      } else {
        console.log("success");
        // res.status(201).json({success:true});
      }
})
return agent.add("Please enter your orderID again to check whether HOLD or SUCCESS");
}
async function  count (agent) {
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
          const filePath = path.join( "..","..","csv-" + dateTime + ".csv")
          fs.writeFile(filePath, csv, function (err) {
            if (err) {
              console.log("error");
            }
            else {
            //   setTimeout(function () {
            //     fs.unlinkSync(filePath); // delete this file after 30 seconds
            //   }, 30000)
              console.log("downloading");
            }
          });
    
        }
      })
    return agent.add("Hold and success count will be downloaded on your desktop ");
   
}
async function  deleteorder (agent) {

    const orderId=agent.parameters.Orderid;
    const orderData=await Order.findOne({orderId:orderId})
     const duplicate=orderData
    if(orderData){
        Order.deleteOne({orderId:orderId},function(err){
            if(err){
                console.log("Failure");
            }
            else{
                console.log("Success");
            }
        })
        return agent.add(`OrderId ${orderId} deleted successfully! deleted ORDER details  are as follows
        OrderID-${duplicate.orderId}
        Zipcode-${duplicate.zipcode}
        Email-${duplicate.email}
        Date-${duplicate.date}`);
    }
    else{
        return agent.add(`Order not found`);
    }
}
module.exports = {  defaultFallback: defaultFallback ,yesupdate:yesupdate, count:count,deleteorder:deleteorder};