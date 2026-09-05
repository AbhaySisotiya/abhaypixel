const sharp = require("sharp");
const PDFDocument = require("pdfkit");

const ConvertImage = async (req, res) => {
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
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error: " + error });
  }
};

const ConvertToPdf = async (req, res) => {
  try {
    if (!req.files?.length) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    const targetbytes = Number(req.body.target) * 1024 * 1024;

    const pdfBuffer = await createPDF(req.files, targetbytes ? targetbytes : 0);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="converted.pdf"',
      "Content-Length": pdfBuffer.length,
    });
    return res.send(pdfBuffer);
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error: " + err });
  }
};

const createPDF = async (files, targetbytes) => {
  let quality = 90;
  let width = 2000;

  const maxAttempts = targetbytes ? 10 : 1;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const doc = new PDFDocument({
      size: "A4",
      margin: 0,
      autoFirstPage: false,
    });

    const chunks = [];

    doc.on("data", (chunk) => {
      chunks.push(chunk);
    });

    const pdfPromise = new Promise((resolve, reject) => {
      doc.on("end", () => {
        resolve(Buffer.concat(chunks));
      });

      doc.on("error", reject);
    });

    for (const file of files) {
      let imageBuffer;
      if (Number(targetbytes) > 0) {
        imageBuffer = await sharp(file.buffer)
          .rotate()
          .resize({
            width,
            withoutEnlargement: true,
          })
          .jpeg({
            quality,
            mozjpeg: true,
          })
          .toBuffer();
      } else {
        imageBuffer = file.buffer;
      }

      const metadata = await sharp(imageBuffer).metadata();

      const pageWidth = 595.28;
      const pageHeight = 841.89;

      const imageWidth = metadata.width;
      const imageHeight = metadata.height;

      const ratio = Math.min(pageWidth / imageWidth, pageHeight / imageHeight);

      const pdfWidth = imageWidth * ratio;
      const pdfHeight = imageHeight * ratio;

      const x = (pageWidth - pdfWidth) / 2;
      const y = (pageHeight - pdfHeight) / 2;

      //add page
      doc.addPage({
        size: "A4",
        margin: 0,
      });

      //add image
      doc.image(imageBuffer, x, y, {
        width: pdfWidth,
        height: pdfHeight,
      });
    }

    doc.end();

    const pdfBuffer = await pdfPromise;

    if (!targetbytes || pdfBuffer.length <= targetbytes) return pdfBuffer;

    quality -= 10;
    width = Math.floor(width * 0.8);
    if (quality < 30) quality = 30;
    if (width < 600) width = 600;
  }
};

module.exports = { ConvertToPdf, ConvertImage };

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
