const express = require("express");
const DB = require("./config/database");
const web = require("./routes/web");
const api = require("./routes/api");
const channel = require("./routes/channel");
const app=express();
const cors = require("cors"); 
require('dotenv').config();
const port = process.env.PORT || 3000

// connect Db
DB();

// use  
app.use(express.urlencoded({ extended: false })) 
app.use(express.json())  
app.use(express.static("public"));
app.set("views", "views");
app.set("view engine", "hbs");
app.use(cors());

// routes
app.use("/",web);
app.use("/api",api);
app.use("/channel",channel); 

// Express Error Handling
app.get('*', (req, res, next) => {
    res.render("pageNotFound")
    next()
});


  

// Port
app.listen(port||8000,()=>{
    console.log("App is running")
})