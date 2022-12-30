const express = require("express");
const router = express.Router();
const register = require("../../Schemas/RegisterSchema");
const protected = require("../../Routes/RouteConfig/ProtectedRoute");

router.get("/getallusers", protected, async (req, res) => {
  try {
    const users = await register.find().select(["-password", "-otp"]);
    res
      .status(200)
      .json({ data: users, message: "Users fetched Successfully" });
  } catch (err) {
    console.log({ err: err });
  }
});

router.post("/deleteuser/:_id", protected, async (req, res) => {
  try {
    const newUsers = await register.findByIdAndDelete({
      _id: req.params._id,
    });
    res.status(200).json({ message: "User Deleted successfully" });
  } catch (err) {
    console.log({ err: err });
  }
});
module.exports = router;
