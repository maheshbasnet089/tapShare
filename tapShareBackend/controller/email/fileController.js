const File = require("../../model/fileModel");
const sendEmail = require("../../services/sendEmail");

exports.sendFiles = async (req, res) => {
  const files = req.files;

  const filePaths = [];

  for (var i = 0; i < files.length; i++) {
    const newFile = await File.create({
      name: files[i].originalname,
      path: files[i].path.replace(/\\/g, '/'), // replace backslash with forward slash
      size: files[i].size,
    });

    const savedFile = await newFile.save();
    if (savedFile) filePaths.push(newFile.path);
  }
  // send email here
  const emailOptions = {
    to: req.body.email,
    subject: "New files received",
    text: "New files received",
  };

  // Add file paths as links in the email body
  emailOptions.text += "\nFile paths:\n";
  for (const filePath of filePaths) {
    emailOptions.text += `${process.env.baseUrl}${filePath}\n`;
  }

  sendEmail(emailOptions);

  res.json({
    message: "File sent successfully",
    status: 200,
  });
};
