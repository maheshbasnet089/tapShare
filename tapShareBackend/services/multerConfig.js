const multer = require("multer");
var path = require("path");

const fs = require("fs");

function generateFileNumber() {
  const fileNumber = Math.floor(10000 + Math.random() * 90000);
  return fileNumber;
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    let fileNumber = generateFileNumber();
    const filePath = path.join(
      __dirname,
      "uploads",
      fileNumber + path.extname(file.originalname)
    );
    while (fs.existsSync(filePath)) {
      fileNumber = generateFileNumber();
    }
    cb(null, fileNumber + path.extname(file.originalname));
  },
});

module.exports = {
  multer,
  storage,
};
