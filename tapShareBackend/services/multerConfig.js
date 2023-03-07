const multer = require("multer");
var path = require("path");
const fileNumber = Math.floor(100000 + Math.random() * 900000);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, fileNumber + path.extname(file.originalname));
  },
});

module.exports = {
  multer,
  storage,
};
