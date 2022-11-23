const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    console.log(users)
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
});

router.get("/create" , async(req,res) =>{
  try{
    const user = await new User({name : req.body.name,
    email: req.body.email}).save();
    res.send("user created")
  }
  catch(err){
    console.log(err)
  }
  
})

module.exports = router;
