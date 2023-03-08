const File = require("../../model/fileModel");
const sendEmail = require("../../services/sendEmail");
const sendSms = require("../../services/sendSms");

exports.sendFiles = async (req, res) => {
  const files = req.files;
  try {
    const filePaths = [];

    for (var i = 0; i < files.length; i++) {
      console.log("path", files[i].path);
      const newFile = await File.create({
        name: files[i].originalname,
        path: files[i].path.replace(/\\/g, "/").replace("uploads/", ""), // replace backslash with forward slash
        size: files[i].size,
      });
      console.log(newFile);

      const savedFile = await newFile.save();
      if (savedFile) filePaths.push(newFile.path);
    }
    // send email here
    const emailOptions = {
      to: req.body.email,
      subject: "New files received",
      text: "New files received",
    };

    const fileLinksForSsr = [];

    // Add file paths as links in the email body
    emailOptions.text += "\nFile paths:\n";
    for (const filePath of filePaths) {
      emailOptions.text += `${process.env.baseUrl}${filePath}\n`;
      fileLinksForSsr.push(`${process.env.baseUrl}${filePath}`);
    }

    console.log(fileLinksForSsr);
    console.log(req.body.email);

    if (req.body.email.startsWith("98")) {
      console.log(req.body.email);
      try {
        await sendSms(emailOptions);
        return res.json({
          message: "File sent successfully",
          status: 200,
        });
      } catch (e) {
        return res.json({
          message: "Error sending sms",
          status: 500,
        });
      }
    } else if (req.body.email) {
      sendEmail(emailOptions);

      return res.json({
        message: "File sent successfully",
        status: 200,
      });
    } else if (req.body.email === "" || req.body.email === null) {
      console.log("inside else if");

      return res.json({
        generatedLinks: fileLinksForSsr,
        message: "Link generated",
        status: 201,
      });
    } else {
      return res.json({
        message: "Error sending file",
        status: 500,
      });
    }
  } catch (e) {
    console.log(e);
    res.json({
      errorMessage: e.message,
      message: "Error sending file",
      status: 500,
    });
  }
};
