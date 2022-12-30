const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const register = require("../../Schemas/RegisterSchema");
const key = require("../../Constants/RouteConstants");

router.post("/verifyotp", async (req, res) => {
  try {
    const checkOtp = await register.findOne({ number: req.body.number });
    const verify = await bcrypt.compare(req.body.otp, checkOtp.otp);
    if (!verify) {
      return res.json({ message: "Otp is Incorrect" }).status(400);
    }
    const token = await jsonwebtoken.sign({ email: checkOtp.email }, key.key);
    const { name, email, number } = checkOtp;
    res
      .header("auth", token)
      .json({
        token: token,
        data: { name, email, number },
        message: "login successfull",
      })
      .status(200);
  } catch (err) {
    console.log({ err: err });
  }
});
module.exports = router;
