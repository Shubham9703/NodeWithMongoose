const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EmployeeKey = new Schema({
    name: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    password:{
        type:String
    },
    avatar:{
        type:String 
    }
}, { timestamps: true });





EmployeeModel = mongoose.model("employee", EmployeeKey);
module.exports = EmployeeModel;
