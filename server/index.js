const express=require("express")
require('./db/connect')

const app=express();
const port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log('Connection to server made')
})