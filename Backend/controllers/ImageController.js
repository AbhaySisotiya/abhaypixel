const sharp = require("sharp");

const ConvertImage = async(req,res) => {

  try {


    const filetype = req.body.type?.toLowerCase() || "png";
    console.log(filetype);
    
    const inputImageBuffer = req.file.buffer;


    const output = await sharp(inputImageBuffer)
    .toFormat(filetype === "jpg" ? "jpeg" : filetype)
    .toBuffer();

      res.set("Content-Type", `image/${filetype === "jpg" ? "jpeg" : filetype}`);
      res.send(output);

  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error: " + error });
  }
};

module.exports = { ConvertImage };



// const conversavedtImg = async (req, res) => {
//   try {
//     console.log(req.body);
    
//     const type = req.body.type || "png";

//     const inputImagePath = req.file.path;
//     const outputImageName = path.join(
//       __dirname,
//       "..",
//       "uploads/compress/",
//       `${type}__${req.file.originalname.split(".")[0]}__abhaypixel`
//     );

//     sharp(inputImagePath)
//       .toFormat(type)
//       .toFile(`${outputImageName}.${type}`)
//       .then(() => {
//         console.log("Image converted to WebP successfully");
//       })
//       .catch((err) => {
//         console.error("Error converting image:", err);
//       });

//     res.json({
//       success:true,
//       message: `Image Convert Into ${type} Successfully`,
//       imgPath:`${outputImageName}.${type}`
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ success: false, message: "Internal Server Error: " + error });
//   }
// };
