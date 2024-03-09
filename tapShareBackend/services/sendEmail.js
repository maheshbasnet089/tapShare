const nodemailer = require("nodemailer");
const { EMAIL, EMAIL_APP_PASSWORD } = require("../config/secrets");

const sendEmail = async (options) => {
  try {
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: EMAIL,
        pass: EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `tapshare<${EMAIL}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to propagate it to the caller
  }
};

module.exports = sendEmail;
