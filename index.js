const express=require('express')
require('./server/db/connect')
const path = require("path");
const bodyParser = require("body-parser");
const config = require("./server/config/keys");
const cors = require("cors");
const app=express();
const port=process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/dialogflow', require('./server/routes/dialogflow'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}


app.listen(port,()=>{
    console.log('Connection to server made')
})