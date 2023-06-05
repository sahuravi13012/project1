const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/companytask")
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.log("Mongo Error...", err);
  });

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  gender: {
    type: String,
  },
  status: {
    type: String,
    default: "active",
  },
  profile: String,
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
