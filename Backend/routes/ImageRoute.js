const express = require("express");
const route = express.Router();
const AuthCheck = require("../middlewares/AuthMiddleware");
const ImageController = require("../controllers/ImageController");
const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({ storage });

route.post(
  "/convert",
  AuthCheck,
  upload.single("image"),
  ImageController.ConvertImage
);



module.exports = route;
