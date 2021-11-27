
const axios=require('axios');
const Order=require('../model/data');
const validator = require("email-validator");
async function  defaultFallback (agent) {
    const word=agent.parameters.number;
    
        const orderId=word;
        const orderData=await Order.findOne({orderId:orderId})
        console.log(orderId)
        if(orderData){
            if(orderData.email && orderData.zipcode && orderData.date && validator.validate(orderData.email)){
            

               return agent.add("Order has been placed! It is under processing.Do you need to update any information?");
            }
            else{

                return agent.add("Your order is on hold are you okay with updating the wrong information?");

            }
        }
        else{
            return agent.add("I am Sorry! OrderID cannot be found.");
        }
       
    
    
}
module.exports = {  defaultFallback: defaultFallback };