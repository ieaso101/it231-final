const mongoose = require("mongoose"),
  subscriberSchema = mongoose.Schema({
    name: String,
    email: String,
    message: String
  });

module.exports = mongoose.model("Subscriber", subscriberSchema);