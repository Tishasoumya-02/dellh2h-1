


function  defaultFallback (agent) {
    const word=agent.parameters.number;

    try{
        const orderId=word;
        const orderData= Order.findOne({orderId:orderId})
      
        if(orderData){
            if(orderData.email && orderData.zipcode && orderData.date && validator.validate(orderData.email)){
            
                return agent.add("Order is success");
                  
            }
            else{
                return agent.add("Order is on hold");
              
            }
        }
        else{
            return agent.add("No such order found");
        }
       
    
    }
    catch{
        return agent.add("No such order found");
    }
    
    
}
module.exports = {  defaultFallback: defaultFallback };