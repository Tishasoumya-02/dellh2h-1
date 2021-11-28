const mongoose=require("mongoose");

const countSchema=new mongoose.Schema({
    holdCount:{
        type:Number
    },
    successCount:{
        type:Number
        
    },
    date:{
        type:String
    }
});

const Count=new mongoose.model("COUNT",countSchema);
module.exports=Count;