const mongoose = require("mongoose");
mongoose.connect(`mongodb://localhost:27017/Dummy`, {useNewUrlParser: true, useUnifiedTopology: true}, (connectionError, connectionResult)=>{
    if(connectionError){
        console.log("Database is not connected");
    } else{
        console.log("Database has been connected");
    }
});