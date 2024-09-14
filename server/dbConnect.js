
const mongoose = require("mongoose");
const dbConnect = () => {
    const connectionsParams = {useNewUrlParser:true};
    mongoose.connect(process.env.DB,connectionsParams);

    mongoose.connection.on("connected", ()=>{
        console.log("Connected to database succesfully ")
    });
    mongoose.connection.on("error", (err)=>{
        console.log("Error while connecting to database:"+err)
    });
    mongoose.connection.on("disconnected", ()=>{
        console.log("Connection to database disconnected")

    });
};

module.exports=dbConnect;