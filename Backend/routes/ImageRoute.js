const express = require("express");
const route = express.Router();
const AuthCheck = require("../middlewares/AuthMiddleware");
const ImageController = require("../controllers/ImageController");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    files: 20,
    fileSize: 10 * 1024 * 1024, // 10 MB per image
  },
});

route.post(
  "/convert",
  AuthCheck,
  upload.single("image"),
  ImageController.ConvertImage
);

route.post(
  "/converttopdf",
  AuthCheck,
  upload.array("images", 20),
  ImageController.ConvertToPdf
);

module.exports = route;
