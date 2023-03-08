const express = require("express");
const app = express();
const mongoConnection = require("./database/dbConfig");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const fs = require("fs");

//CORS
const corsOptions = {
  origin: "https://tapshare.xyz",
  // origin: "http://127.0.0.1:5173",
  // credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.get("/hello", (req, res) => {
  res.send("hellow");
});

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
