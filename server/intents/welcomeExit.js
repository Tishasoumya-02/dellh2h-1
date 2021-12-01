
const axios=require('axios');
const Order=require('../model/data');
const validator = require("email-validator");
async function  defaultFallback (agent) {
    const word=agent.parameters.number;
    const orderId=word;
    const orderData=await Order.findOne({orderId:orderId})
    console.log(orderId)
    if(orderData){
       
        if(!orderData.email || !validator.validate(orderData.email)){
     
          
            return agent.add(`Hey! Your order is as of now on HOLD. You need to update your email. ORDER details are as follows
            OrderID-${orderData.orderID} \n
            Zipcode-${orderData.zipcode}\n
            Email-${orderData.email}\n
            Date-${orderData.date}\n Do you want to update your email?`);
        }
        else if(!orderData.zipcode || orderData.zipcode.length<4){
            return agent.add(`Hey! Your order is as of now on HOLD. You need to update your Zipcode. ORDER details are as follows
            OrderID-${orderData.orderID}\n
            Zipcode-${orderData.zipcode}\n
            Email-${orderData.email}\n
            Date-${orderData.date} Do you want to update your Zipcode? `);
        }
        else if(!orderData.date){
         
            return agent.add(`Hey! Your order is as of now on HOLD. You need to update your Date. ORDER details are as follows
            OrderID-${orderData.orderID}
            Zipcode-${orderData.zipcode}
            Email-${orderData.email}
            Date-${orderData.date}  Do you want to update the Date?`);
        }
        else{
           
                return   agent.add(`Hey! Your order is SUCCESS. ORDER details are as follows
                OrderID-${orderData.orderID}
                Zipcode-${orderData.zipcode}
                Email-${orderData.email}
                Date-${orderData.date} Do you want to update any information`);
        }
        
    }
    else{
        
        return  agent.add("failed");;
    }
        // const orderId=word;
        // const orderData=await Order.findOne({orderId:orderId})
        // console.log(orderId)
        // if(orderData){
        //     if(orderData.email && orderData.zipcode && orderData.date && validator.validate(orderData.email)){
              
                

        //        return agent.add("Order has been placed!Your order is as follows-"+"\n"+
        //        `OrderID-${orderData.orderID}
        //        Zipcode-${orderData.zipcode}
        //        Email-${orderData.email}
        //        Date-${orderData.date}`+"\n"+
        //        "It is under processing.Do you need to update any information?.");
        //     }
        //     else{

        //         return agent.add(`Your order is on hold are you okay with updating the wrong information? 
        //         Your order is as follows-
        //         OrderID-${orderData.orderID}
        //         Zipcode-${orderData.zipcode}
        //         Email-${orderData.email}
        //         Date-${orderData.date}`);

        //     }
        // }
        // else{
        //     return agent.add("I am Sorry! OrderID cannot be found.");
        // }
       
    
    
}
module.exports = {  defaultFallback: defaultFallback };