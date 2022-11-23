const express = require("express");
const router = express.Router();
const Interview = require("../models/Interview");
const User = require("../models/User");
const check = require("../middleware/interview");
const check_update = require("../middleware/update_interview");

router.get("/", async (req, res) => {
  try {
    const interview = await Interview.find();
    res.send(interview);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});
router.post("/", check, async(req, res) => {
  try {
    email = [];
    req.body.user.forEach((users) => {
      email.push(users.email);
    });
    const newInterview = new Interview({
      email: email,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    });
    const interview = await newInterview.save();
    
    email.forEach(async(ert)=>
    {
      try{
      const user = await User.findOne({email : ert})
      console.log(user);
      user.interviews.push(interview._id);
      await user.save();
      }
      catch(e) {
        console.log(e);
      }
    });
    //res.send("Interview Created ....");
    res.json({email : email , inter : interview})
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/update", check_update, async (req, res) => {
  try {
    const currInterview = await Interview.findById(req.body.interviewId);
    email = [];
    req.body.user.forEach((newUser) => {
      email.push(newUser.email);
    });
    await Interview.findByIdAndUpdate(req.body.interviewId, {
      email,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    });
    const interview = await Interview.findById(req.body.interviewId);
    req.body.user.forEach(async (users) => {
      const USER = await User.findById(users._id);
      if (!USER.interviews.includes(req.body.interviewId)) {
        await USER.interviews.push(req.body.interviewId);
        await USER.save();
      }
    });
    const oldUsersEmail = currInterview.email.filter(
      (emails) => !interview.email.includes(emails)
    );
    oldUsersEmail.forEach(async (oldEmail) => {
      const oldUser = await User.findOne({ email: oldEmail });
      const index = oldUser.interviews.indexOf(req.body.interviewId);
      if (index > -1) oldUser.interviews.splice(index, 1);
      await oldUser.save();
    });
    res.send("updated ... ");
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = router;
