const mongoose = require("mongoose");

const user = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  role: {
    type: String,
  },
  team: {
    type: String,
  },
},{timeStamp:true});

module.exports = mongoose.model('user',user)