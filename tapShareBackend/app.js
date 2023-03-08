const express = require("express");
const app = express();
const mongoConnection = require("./database/dbConfig");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const fs = require("fs");

app.use(cors({ origin: "https://www.tapshare.xyz" }));

app.get("/:fileName", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.fileName);
  console.log(filePath);
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

//require routes
const fileRoute = require("./route/fileRoute");
mongoConnection(process.env.MONGO_URI);

//parses the body data in json

app.use("/api/v1", fileRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
