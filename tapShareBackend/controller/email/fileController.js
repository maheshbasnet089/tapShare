const File = require("../../model/fileModel");
const sendEmail = require("../../services/sendEmail");
const fs = require("fs");
const path = require("path");
const { BASE_URL } = require("../../config/secrets");

const UPLOADS_DIR = path.join(__dirname, "../../uploads");

const getDiskPath = (storedPath) => {
  const fileName = path.basename(storedPath.replace(BASE_URL + "u/", ""));
  const filePath = path.join(UPLOADS_DIR, fileName);
  const resolvedPath = path.resolve(filePath);
  if (!resolvedPath.startsWith(path.resolve(UPLOADS_DIR))) {
    return null;
  }
  return resolvedPath;
};

const deleteFilesFromDisk = async (files) => {
  for (const f of files) {
    const filePath = getDiskPath(f.path);
    if (!filePath) continue;
    try {
      await fs.promises.unlink(filePath);
    } catch (err) {
      if (err.code !== "ENOENT") {
        console.error("Error deleting file:", err);
      }
    }
  }
};

const canDeleteShare = (shareUserId, storedIp, { ipAddress, clientUserId }) => {
  if (ipAddress && storedIp === ipAddress) return true;
  if (!clientUserId) return false;
  return shareUserId === clientUserId;
};

exports.deleteShare = async (req, res) => {
  const userId = req.params.userId;
  const { ipAddress, clientUserId } = req.body;

  if (!ipAddress && !clientUserId) {
    return res.status(400).json({
      message: "ipAddress or clientUserId is required",
      status: 400,
    });
  }

  try {
    const files = await File.find({ userId });
    if (!files.length) {
      return res.status(404).json({ message: "No files found", status: 404 });
    }

    if (!canDeleteShare(userId, files[0].ipAddress, { ipAddress, clientUserId })) {
      return res.status(403).json({
        message: "Not authorized to delete this share",
        status: 403,
      });
    }

    await deleteFilesFromDisk(files);
    await File.deleteMany({ userId });

    return res.json({ message: "Share deleted successfully", status: 200 });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};

exports.sendFiles = async (req, res) => {
  const files = req.files;

  if (!files || !files.length) {
    return res.status(400).json({
      status: 400,
      message: "No files uploaded",
    });
  }

  try {
    const filePaths = [];
    const filesAssociatedWithUserId = await File.find({
      userId: req.body.userId,
    });

    if (filesAssociatedWithUserId.length !== 0) {
      for (let i = 0; i < filesAssociatedWithUserId.length; i++) {
        if (
          filesAssociatedWithUserId[i].ipAddress &&
          filesAssociatedWithUserId[i].ipAddress !== req.body.ipAddress
        ) {
          return res.json({
            status: 400,
            message: "Please don't use other's userId",
          });
        }
      }
    }

    for (let i = 0; i < files.length; i++) {
      const newFile = await File.create({
        userId: req.body.userId,
        name: files[i].originalname,
        path:
          BASE_URL +
          "u/" +
          files[i].path.replace(/\\/g, "/").replace("uploads/", ""),
        size: files[i].size,
        ipAddress: req.body.ipAddress,
      });
      filePaths.push(newFile.path);
    }

    const emailOptions = {
      to: null,
      subject: "New File Received from TapShare ",
      text: "Tapshare is a simple, secure, and reliable file sharing platform that allows users to quickly and easily send large files over the internet.Give it a  try today at https://www.tapshare.xyz/ . For more Info visit https://github.com/maheshbasnet089/tapShare",
    };
    emailOptions.text += "\n\nShared Files(tap to download):\n";
    for (const filePath of filePaths) {
      emailOptions.text += `${filePath}\n`;
    }

    let sendToData = [];
    if (req.body.email) {
      try {
        sendToData = JSON.parse(req.body.email);
      } catch {
        return res.status(400).json({
          status: 400,
          message: "Invalid email data format",
        });
      }
    }

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

    let emailFailed = false;
    if (emails.length > 0) {
      for (const email of emails) {
        emailOptions.to = email.value;
        try {
          await sendEmail(emailOptions);
        } catch (error) {
          console.error(error);
          emailFailed = true;
        }
      }
    }

    if (emailFailed) {
      return res.json({
        message: "Files uploaded but some emails failed to send",
        status: 207,
      });
    }

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
