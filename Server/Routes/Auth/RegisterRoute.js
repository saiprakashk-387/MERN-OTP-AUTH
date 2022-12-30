const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const register = require("../../Schemas/RegisterSchema");
const endUrl = require('../../Constants/RouteConstants')

// console.log("endUrl",endUrl.register);

router.post("/register", async (req, res) => {
  try {
    const checkEmail = await register.findOne({ email: req.body.email });
    if (checkEmail) {
      return res.json("Email already exists").status(400);
    } else {
      var pwdhash = await bcrypt.hash(req.body.password, 10);
      const newUser = await new register({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        password: pwdhash,
        role:req.body.role,
        otp:req.body.otp
      });
      const user = await newUser.save();
      res.status(200).json({ message: "Registered Successfully" });
    }
  } catch (err) {
    console.log({ err: err });
  }
});
module.exports = router;