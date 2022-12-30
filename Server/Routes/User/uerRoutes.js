const express = require("express");
const router = express.Router();
const user = require("../../Schemas/UserSchems");
const ProtectedRoute = require("../RouteConfig/ProtectedRoute");

router.get("/userslist", ProtectedRoute, async (req, res) => {
  try {
    const getList = await user.find({});
    res.json({ data: getList, message: "Users Fetched" }).status(200);
  } catch (err) {
    console.log({ err: err });
  }
});

router.post("/adduser", ProtectedRoute, async (req, res) => {
  try {
    const newUser = await new user({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      team: req.body.team,
    });
    const userData = newUser.save();
    res.json({ message: "User Added successfully" }).status(200);
  } catch (err) {
    console.log({ err: err });
  }
});

router.post("/updateuserinfo/:_id", ProtectedRoute, async (req, res) => {
  try {
    const userInfo = await user.findByIdAndUpdate(
      { _id: req.params._id },
      { $set: req.body },
      { new: true }
    );
    res.json({ message: "User Info Updated" }).status(200);
  } catch (err) {
    console.log({ err: err });
  }
});

router.post("/deleteuserinfo/:_id", ProtectedRoute, async (req, res) => {
  try {
    const removeUser = await user.findByIdAndDelete({ _id: req.params._id });
    res.json({ message: "User Deleted" }).status(200);
  } catch (err) {
    console.log({ err: err });
  }
});

module.exports = router;
