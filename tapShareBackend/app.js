const express = require("express");
const app = express();
const mongoConnection = require("./database/dbConfig");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const File = require("./model/fileModel");

const schedule = require('node-schedule');
const http = require('http');

// Define the URL of the web service endpoint
const serviceEndpoint = 'https://shark-app-u4nc5.ondigitalocean.app/whoami';

// Create a scheduled job that triggers an HTTP request every 10 minutes
const job = schedule.scheduleJob('*/10 * * * *', function(){
  // Send an HTTP GET request to the service endpoint
  http.get(serviceEndpoint, (response) => {
    // Log the response
    console.log(`Ping to ${serviceEndpoint}: ${response.statusCode}`);
    // Consume the response data to free up resources
    response.resume();
  }).on('error', (error) => {
    // Handle any errors that occurred during the request
    console.error(`Error pinging ${serviceEndpoint}: ${error.message}`);
  });
});

//CORS
const corsOptions = {
  origin: "https://tapshare.xyz",
  // origin: "http://127.0.0.1:5173",
  // credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/whoami",(req,res)=>{
  res.send("I am tapshare.I am a platform that enables users to transfer files, including zip files, to email and phone number in a tap.")
})

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
  const filePath = path.join(__dirname, "uploads", req.params.fileName);
  console.log("File path:", filePath);

  const fileExists = fs.existsSync(filePath);
  console.log("File exists:", fileExists);

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
