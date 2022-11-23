const mongoose = require('mongoose')
const validator = require('validator') // check data is correct or not
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true,
        trim: true // remove spaces front and back
    },
    email : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    interviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'interview'
    }]

})
 const user = mongoose.model('User', userSchema)

 module.exports = user



 