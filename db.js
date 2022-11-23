const mongoose = require('mongoose')
require('dotenv').config();
//console.log(process.env.MONGO_URL);

try{
    mongoose.connect(process.env.MONGO_URL  || "mongodb+srv://Apoorv:Apoorv1!@cluster0.3eeqlsr.mongodb.net/?retryWrites=true&w=majority" , 
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
    console.log("MONGO Connected");
}
catch(err) {
    console.log(err.message);
    process.exit(1);
}
