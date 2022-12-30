const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const register = require("../../Schemas/RegisterSchema");
const key = require("../../Constants/RouteConstants");

router.post("/login", async (req, res) => {
   try {   
    var checkEmail = await register.findOne({ email: req.body.email });
    if (!checkEmail) {
      return res.status(400).json({ message: "Email does not exists" });
    }
     var checkPwd = await bcrypt.compare(req.body.password, checkEmail.password);
    if (!checkPwd) {
      return res.status(400).json({ message: "Password Dosen't match " });
    }  
      var token = await jsonwebtoken.sign({email:req.body.email},key.key);
      const{name,email,role}= checkEmail;
      res.header("auth",token).status(200).json({token:token,data:{name,email,role},message:"login successfull"})
  } catch (err) {
    console.log({ err: err });
  }
});
module.exports= router