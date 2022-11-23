const Interview = require('../models/Interview')
const User = require('../models/User')
const check_update = async(req,res,next) => {
    if(req.body.user.length<2){
        return res.status(401).send({error : "must have atleast two users"})
    }
    const users = req.body.user
    const startTime = req.body.startTime
    const endTime = req.body.endTime
    const current_date = new Date().toLocaleDateString()
    const current_time = new Date().toLocaleTimeString('en-IN')

    if(startTime > endTime)
    return res.status(401).send({error : "start time should be less than end time"})
    
    if(new Date(parseInt(startTime)).toLocaleDateString() < current_date)
    return res.status(401).send({error : "Time already passed"})

    if(new Date(parseInt(startTime)).toLocaleDateString() == current_date && (new Date(parseInt(startTime)).toLocaleTimeString('en-IN')<current_time))
    return res.status(401).send({error : "Time already passed"})

    for(user of users) {
        const user_check = await User.findOne({_id: user._id})
        for(item of user_check.interviews){
            const interview = await Interview.findOne({_id : item})
            if(item == req.body.interviewId) 
            continue
            if(!(interview.endTime<=startTime || interview.startTime>=endTime) )
            return res.status(401).send({error : "User" + user_check.name+ "already busy in this slot"})
        }
    }
  next();
}
module.exports = check_update;