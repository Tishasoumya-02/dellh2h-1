
const Order=require('../model/data');
const validator = require("email-validator");
var updateparameter=null;
var updateorder=null;
async function  defaultFallback (agent) {
    const word=agent.parameters.number;
    const orderId=word;
    const orderData=await Order.findOne({orderId:orderId})
    console.log(orderId)
    if(orderData){
       
        if(!orderData.email || !validator.validate(orderData.email)){
            
            updateorder=orderData;
           updateparameter="email";
            return agent.add(`Hey! Your order is as of now on HOLD. You need to update your email. ORDER details are as follows
            OrderID-${orderData.orderId} \n
            Zipcode-${orderData.zipcode}\n
            Email-${orderData.email}\n
            Date-${orderData.date}\n Do you want to update your email?`);
        }
        else if(!orderData.zipcode || orderData.zipcode.length<4){
            updateorder=orderData;
            updateparameter="zipcode";
            return agent.add(`Hey! Your order is as of now on HOLD. You need to update your Zipcode. ORDER details are as follows
            OrderID-${orderData.orderId}\n
            Zipcode-${orderData.zipcode}\n
            Email-${orderData.email}\n
            Date-${orderData.date} Do you want to update your Zipcode? `);
        }
        else if(!orderData.date){
            updateparameter="date";
            updateorder=orderData;
            return agent.add(`Hey! Your order is as of now on HOLD. You need to update your Date. ORDER details are as follows
            OrderID-${orderData.orderId}
            Zipcode-${orderData.zipcode}
            Email-${orderData.email}
            Date-${orderData.date}  Do you want to update the Date?`);
        }
        else{
                 updateorder=orderData;
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
var myquery = { _id: updateorder._id };
var newvalues = { $set: {updateparameter: word } };
Order.updateOne(myquery, newvalues, function(err, res)
{
    if (err) {
        console.log("err", err);
        // res.status(500).json({success:false});
      } else {
        console.log("success");
        // res.status(201).json({success:true});
      }
})

 return agent.add("I got , is that right?");
}

module.exports = {  defaultFallback: defaultFallback ,yesupdate:yesupdate};