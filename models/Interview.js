const mongoose = require('mongoose')

const interviewSchema = new mongoose.Schema({
    startTime : {
        type : String,
        required : true,
    },
    endTime : {
        type : String,
        required : true,
    },
    email : [{
        type : String,
        lowercase : true,
        trim : true   
    }],

})
 const interview = mongoose.model('Interview', interviewSchema)
 module.exports = interview