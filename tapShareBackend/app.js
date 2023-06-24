const express = require("express");
const app = express();
const mongoConnection = require("./database/dbConfig");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const File = require("./model/fileModel");
const codeRoute = require("./route/codeRoute");

//CORS config
const corsOptions = {
  origin: "https://tapshare.xyz",
  // origin: "http://127.0.0.1:5173",
  // credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/whoami", (req, res) => {
  res.send(
    "I am tapshare.I am a platform that enables users to transfer files, including zip files, to email and phone number in a tap."
  );
});

app.get("/:userId", async (req, res) => {
  try {
    const files = await File.find({ userId: req.params.userId });

    if (!files) {
      return res.json({
        status: 404,
        message: "No files found or link has been expired ",
      });
    }

    res.json({
      status: 200,
      message: "Files fetched successfully",
      files,
    });
  } catch (e) {
    res.json({
      status: 500,
      message: e.message,
    });
  }
});

app.get("/u/:fileName", (req, res) => {
  try {
    const filePath = path.join(__dirname, "uploads", req.params.fileName);

    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
      res.download(filePath, req.params.fileName, (err) => {
        if (err) {
          console.log("Error downloading file:", err);
        } else {
          console.log("File downloaded successfully");
        }
      });
    } else {
      res.status(404).send("File not found or Link has expired");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
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
app.use("/api/v1", codeRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
