const mongoose=require("mongoose");

const dataSchema=new mongoose.Schema({
    orderId:{
        type:Number,
        required:true,
    },
    zipcode:{
        type:Number,
        
    },
    date:{
        type:String,
       
    },
    email:{
        type:String,
        
    }
});

const Order=new mongoose.model("ORDER",dataSchema);
module.exports=Order;