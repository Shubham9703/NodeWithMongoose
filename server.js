const express = require("express");
const app = express();
const port=4000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const db=require("./database/db")

const EmployeeRoute=require('./routes/employee')
app.use('/employee',EmployeeRoute);

app.use('/uploads',express.static('uploads'))

app.get("/", (req, res)=>{
    res.send("Test");
});
app.listen(port, (error, result)=>{
    if(error){
        console.log(`Server not connected`);
    } else{
        console.log(`Server connected on ${port}`);
    }
});