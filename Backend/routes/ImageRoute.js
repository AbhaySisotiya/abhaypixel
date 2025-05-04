const express = require("express");
const route = express.Router();
const AuthCheck = require("../middlewares/AuthMiddleware");
const ImageController = require("../controllers/ImageController");
const upload = require("../middlewares/UploadMiddleware");

route.post(
  "/compress",
  AuthCheck,
  upload.single("image"),
  ImageController.CompressImage
);



module.exports = route;
