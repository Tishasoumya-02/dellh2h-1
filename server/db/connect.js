const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://Aarushi:archit256@cluster0.pjb8r.mongodb.net/dellh2h?retryWrites=true&w=majority')
.then(()=>{
    console.log("Connection with db successful");
})
.catch(e=>{
    console.log(e)
})
