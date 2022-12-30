const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const register = require("../../Schemas/RegisterSchema");
const otpGenerator = require("otp-generator");
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

router.post("/sendotp", async (req, res) => {
  try {
    const checkNumber = await register.findOne({ number: req.body.number });
    if (!checkNumber) {
      return res.json({ message: "Number dosen't exists" }).status(400);
    }
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      digits: true,
    });
    var otphash = await bcrypt.hash(otp, 10);

    const newUser = await register.findOneAndUpdate(
      { number: req.body.number },
      { otp: otphash } ///ading otp value to existing values in schema
    );
    if (newUser?.otp) {
      client.messages
        .create({
          body: `${otp}`,
          from: process.env.MY_TWILIO_PHOMNE_NUMBER,
          to: "+917981129978",
        })
        .then((message) => console.log(message.sid));
    }
    res.json({ message: "Opt Sent To your Number" }).status(200);
  } catch (err) {
    console.log({ err: err });
  }
});

module.exports = router;
