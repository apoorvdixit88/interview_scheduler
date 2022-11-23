const mongoose = require('mongoose')
require('dotenv').config();

try{
    mongoose.connect(process.env.MONGO_URL  || process.env.MONGO_URL , 
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
