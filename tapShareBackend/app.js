const express = require("express");
const app = express();
const mongoConnection = require("./database/dbConfig");
const { PORT } = require("./config/secrets");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const File = require("./model/fileModel");

app.set("view engine", "ejs");
//test
//CORS config
const corsOptions = {
  origin: [
    "https://tapshare.xyz",
    "http://127.0.0.1:5173",
    "http://localhost:5173",
  ],
  // origin: "http://127.0.0.1:5173",
  // credentials: true, //access-control-allow-credentials:true
  optionsSuccessStatus: 200,
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
    // console.log(files.length)
    if (!files.length) {
      return res.json({
        status: 404,
        message: "No files found",
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
    const fileName = path.basename(req.params.fileName);
    const filePath = path.join(__dirname, "uploads", fileName);
    const resolvedPath = path.resolve(filePath);
    const uploadsDir = path.resolve(__dirname, "uploads");

    if (!resolvedPath.startsWith(uploadsDir)) {
      return res.status(400).render("linkExpire", {
        message: "Invalid file path",
        status: 400,
      });
    }

    const fileExists = fs.existsSync(resolvedPath);

    if (fileExists) {
      res.download(resolvedPath, fileName, (err) => {
        if (err) {
          console.log("Error downloading file:", err);
        } else {
          console.log("File downloaded successfully");
        }
      });
    } else {
      res
        .status(404)
        .render("linkExpire", { message: "File not found", status: 404 });
    }
  } catch (error) {
    res.status(500).render("linkExpire", {
      message: "Opps!, Something Went Wrong",
      status: 500,
    });
  }
});

// Connect to MongoDB
mongoConnection();

//parses the body data in json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/uploads")));
//test
//require routes
const fileRoute = require("./route/fileRoute");
const codeRoute = require("./route/codeRoute");
const historyRoute = require("./route/history.routes");

app.use("/api/v1", fileRoute);
app.use("/api/v1", codeRoute);
app.use("/api/v1/history", historyRoute);

app.listen(PORT || 4000, () => {
  console.log(`Server is running on port ${PORT}`);
});
