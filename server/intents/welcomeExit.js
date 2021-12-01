
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
        updateorder=orderData;
        if(!orderData.email || !validator.validate(orderData.email)){
            
            
           updateparameter="email";
            return agent.add(`Hey! Your order is as of now on HOLD. You need to update your email. ORDER details are as follows
            OrderID-${orderData.orderId} \n
            Zipcode-${orderData.zipcode}\n
            Email-${orderData.email}\n
            Date-${orderData.date}\n Do you want to update your email?`);
        }
        else if(!orderData.zipcode || orderData.zipcode.length<4){
           
            updateparameter="zipcode";
            return agent.add(`Hey! Your order is as of now on HOLD. You need to update your Zipcode. ORDER details are as follows
            OrderID-${orderData.orderId}\n
            Zipcode-${orderData.zipcode}\n
            Email-${orderData.email}\n
            Date-${orderData.date} Do you want to update your Zipcode? `);
        }
        else if(!orderData.date){
            updateparameter="date";
        
            return agent.add(`Hey! Your order is as of now on HOLD. You need to update your Date. ORDER details are as follows
            OrderID-${orderData.orderId}
            Zipcode-${orderData.zipcode}
            Email-${orderData.email}
            Date-${orderData.date}  Do you want to update the Date?`);
        }
        else{
                
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

module.exports = {  defaultFallback: defaultFallback ,yesupdate:yesupdate};