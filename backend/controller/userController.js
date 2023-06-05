const { User } = require("../model/db");
const json2csv = require("json2csv").Parser;

const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const users = await User.findById({ _id: id });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const createUser = async (req, res) => {
  try {
    const { fullname, email, gender } = req.body;
    const profilePhoto = req.file.filename;
    console.log(req.file);
    const data = {
      fullname,
      email,
      gender,
      profile: profilePhoto,
    };
    const newUser = await User.create(data);
    console.log("newUser", newUser);
    res.status(200).json({ response: newUser });
    // console.log("first", newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const updateUser = async (req, res) => {
  try {
    const { fullname, email, gender } = req.body;
    const id = req.params.id;

    const data = {
      fullname,
      email,
      gender,
    };
    const newUser = await User.updateOne(
      { _id: id, $set: data }
      // { new: true }
    );

    console.log("first", newUser);
    res.status(200).json({ response: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const _id = req.params.id;
    console.log("status", status);

    const updatedUser = await User.findOneAndUpdate(
      { _id },
      { $set: { status: status } },
      { new: true }
    );

    console.log("updatedUser", updatedUser);
    res.status(200).json({ response: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const newUser = await User.deleteOne({ _id: id });

    console.log("first", newUser);
    res.status(200).json({ response: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const searchQuery = async (req, res) => {
  try {
    const searchTerm = req.query.search;
    console.log("searchTerm", searchTerm);
    const users = await User.find({
      $or: [
        { fullname: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
        { gender: { $regex: searchTerm, $options: "i" } },
        { status: { $regex: searchTerm, $options: "i" } }, // Case-insensitive email search
      ],
    });

    console.log("first", users);
    res.status(200).json({ response: users });
  } catch (error) {
    console.error("Error searching users", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const exportCV = async (req, res) => {
  try {
    const users = await User.find();

    const fields = ["fullname", "email", "gender"];
    const json2csvParser = new json2csv({ fields });
    const csvData = json2csvParser.parse(users);
    res.setHeader("Content-disposition", "attachment; filename=users.csv");
    res.set("Content-Type", "text/csv");
    res.status(200).json(csvData);
  } catch (error) {
    console.error("Error exporting users to CSV", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  searchQuery,
  exportCV,
  updateUserStatus,
  getUserById,
};
