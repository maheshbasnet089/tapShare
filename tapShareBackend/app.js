const express = require("express");
const app = express();
const mongoConnection = require("./database/dbConfig");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const ssrRoute = require("./route/ssrRoute");

//CORS
const corsOptions = {
  // origin: "https://www.tapshare.xyz",
  origin: "http://127.0.0.1:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/:folderNumber", (req, res) => {
  const folderPath = path.join(__dirname, "uploads", req.params.folderNumber);
  console.log(folderPath, "folderPath");

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else {
      const filePaths = files.map((file) => path.join(folderPath, file));

      const uploadsFolder = "uploads";

      const sanitizedFilePaths = filePaths.map((filePath) => {
        const startIndex = filePath.indexOf(uploadsFolder);
        return filePath.substring(startIndex);
      });
      const urls = sanitizedFilePaths.map((filePath) => {
        return `${process.env.baseUrl}${filePath}`
          .replace(/\\/g, "/")
          .replace("uploads/", ""); // replace backslash with forward slash;
      });

      res.json(urls);
    }
  });
});

app.get("/:fileName", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.fileName);

  const fileExists = fs.existsSync(filePath);
  console.log(fileExists);
  if (fileExists) {
    res.download(filePath, req.params.fileName, (err) => {
      if (err) {
        console.log("Error downloading file:", err);
      } else {
        console.log("File downloaded successfully");
      }
    });
  } else {
    res.status(404).send("File not found");
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/uploads")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//require routes
const fileRoute = require("./route/fileRoute");
mongoConnection(process.env.MONGO_URI);

//parses the body data in json

app.use("/api/v1", fileRoute);
app.use("/", ssrRoute);

const PORT = process.env.PORT || 4000;
app.listen(1337, () => {
  console.log(`Server is running on port ${PORT}`);
});
