const express = require("express");
const userRoutes = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `image-${Date.now()}.${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  searchQuery,
  exportCV,
  updateUserStatus,
  getUserById,
} = require("../controller/userController");
userRoutes.post("/adduser", upload.single("profile"), createUser);
userRoutes.put("/updateuser/:id", updateUser);
userRoutes.put("/updateuserstatus/:id", updateUserStatus);
userRoutes.get("/getuser", getUser);
userRoutes.get("/getuserbyid/:id", getUserById);
userRoutes.delete("/deleteuser/:id", deleteUser);
userRoutes.get("/serach", searchQuery);
userRoutes.get("/export/csv", exportCV);

module.exports = { userRoutes };
