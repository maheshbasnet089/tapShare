const File = require("../../model/fileModel");
const sendEmail = require("../../services/sendEmail");
// const sendSms = require("../../services/sendSms");
const fs = require("fs");
const path = require("path");
const schedule = require("node-schedule");
const { BASE_URL } = require("../../config/secrets");
// Function to schedule file deletion after 24 hours
var userJobs = {};

const scheduleDeletion = (userId) => {
  userJobs[userId] = schedule.scheduleJob(
    new Date(Date.now() + 24 * 60 * 60 * 1000),
    // new Date(Date.now() + 60 * 1000),
    async () => {
      console.log("schedule called");
      try {
        const file = await File.find({ userId });
        if (file.length) {
          file.forEach((f) => {
            const filePath = path.join(
              "uploads",
              f.path.replace(BASE_URL + "u/", "")
            );
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error("Error deleting file:", err);
              } else {
                console.log("File deleted successfully:", filePath);
              }
            });
          });
          await File.deleteMany({ userId });
          delete userJobs[userId];
          console.log(userJobs);
        }
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }
  );
  console.log("---", userJobs);
};

const timeOptions = [
  { value: "day", label: "Days", max: 15, in: 24 * 60 * 60 * 1000 },
  { value: "hr", label: "Hours", max: 24, in: 60 * 60 * 1000 },
  { value: "min", label: "Minutes", max: 60, in: 60 * 1000 },
  { value: "sec", label: "Seconds", max: 60, in: 1000 },
];
const validateInput = (type, time) => {
  const selectedOption = timeOptions.find((option) => option.value === type);
  const max = selectedOption.max;
  console.log(selectedOption);
  if (time < 1) {
    return {
      success: false,
      msg: `Minimum expires ${selectedOption.label} is 1`,
    };
  } else if (time > max) {
    return {
      success: false,
      msg: `Maximum expires ${selectedOption.label} is ${max}`,
    };
  } else {
    return { success: true, msg: time * selectedOption.in };
  }
};
exports.rescheduleDeletion = async (req, res) => {
  const id = req.params.id;
  const { type, time } = req.body;
  console.log(req.body);
  if (!type)
    return res.status(400).json({ message: "type is required", status: 400 });

  if (!time)
    return res.status(400).json({ message: "time is required", status: 400 });

  const isInputValid = validateInput(type, time);
  if (!isInputValid.success)
    return res.status(400).json({ message: isInputValid.msg, status: 400 });

  const newDate = isInputValid.msg + Date.now();
  if (userJobs[id]) {
    const resudule = userJobs[id]?.reschedule(new Date(newDate));
    res.send({ resudule, newDate });
  } else {
    res.json({
      message: "there aren't any schedule to change",
      status: 404,
    });
  }
};
exports.sendFiles = async (req, res) => {
  const files = req.files;
  try {
    const filePaths = [];
    // find the file with that userId and ipaddress , if not matches exit
    const filesAssociatedWithUserId = await File.find({
      userId: req.body.userId,
    });
    if (filesAssociatedWithUserId.length !== 0) {
      // loop and check
      for (var i = 0; i < filesAssociatedWithUserId.length; i++) {
        if (filesAssociatedWithUserId[i].ipAddress) {
          if (filesAssociatedWithUserId[i].ipAddress !== req.body.ipAddress) {
            return res.json({
              status: 400,
              message: "Please don't use other's userId",
            });
          }
        }
      }
    }
    for (var i = 0; i < files.length; i++) {
      const newFile = await File.create({
        userId: req.body.userId,
        name: files[i].originalname,
        path:
          BASE_URL+
          "u/" +
          files[i].path.replace(/\\/g, "/").replace("uploads/", ""), // replace backslash with forward slash
        size: files[i].size,
        ipAddress: req.body.ipAddress,
      });
      const savedFile = await newFile.save();
      if (savedFile) {
        filePaths.push(newFile.path);
        console.log("job", userJobs[req.body.userId]);
        if (!userJobs[req.body.userId]) {
          scheduleDeletion(req.body.userId);
        } else {
          console.log("already shedule");
        }
      }
    }
    // send email here test
    const emailOptions = {
      to: null,
      subject: "New File Received from TapShare ",
      text: "Tapshare is a simple, secure, and reliable file sharing platform that allows users to quickly and easily send large files over the internet.Give it a  try today at https://www.tapshare.xyz/ . For more Info visit https://github.com/maheshbasnet089/tapShare",
    };
    // Add file paths as links in the email body
    emailOptions.text += "\n\nShared Files(tap to download):\n";
    for (const filePath of filePaths) {
      emailOptions.text += `${filePath}\n`;
    }
    const sendToData = JSON.parse(req.body.email);

    if (!Array.isArray(sendToData)) {
      return res.json({
        userId: req.body.userId,
        message: "Link generated",
        status: 201,
      });
    }
    const emails = sendToData.filter((data) => data.type === "email");
    const phones = sendToData.filter((data) => data.type === "phone");

    if (emails.length <= 0 && phones.length <= 0) {
      return res.json({
        userId: req.body.userId,
        message: "Link generated",
        status: 201,
      });
    }
    if (emails.length > 0) {
      for (const email of emails) {
        emailOptions.to = email.value;
        try {
          const incomingData = await sendEmail(emailOptions);
          console.log(incomingData);
          // not working here
        } catch (error) {
          console.error(error);
        }
      }
    }

    phones.length > 0 &&
      phones.forEach((phone) => {
        emailOptions.to = phone.value;
        // sendSms(emailOptions);
      });
    return res.json({
      message: "File sent successfully",
      status: 200,
    });
  } catch (e) {
    res.json({
      errorMessage: e.message,
      message: "Error sending file",
      status: 500,
    });
  }
};
