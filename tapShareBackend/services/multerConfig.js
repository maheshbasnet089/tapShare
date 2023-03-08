const multer = require("multer");

const fs = require("fs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const filename = file.originalname.replace(/\s+/g, "-");

    cb(null, filename);
  },
});

module.exports = {
  multer,
  storage,
};
