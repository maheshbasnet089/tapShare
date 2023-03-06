const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  console.log(options);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    // host: "smtp.gmail.com",
    // port: 465,

    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const mailOptions = {
    from: "tapshare<tapshare@gmail.com>",
    to: options.to,
    subject: options.subject,
    text: options.text,
  };

  transporter
    .sendMail(mailOptions)
    .then((info) => {
      console.log("Email sent: " + info.response);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = sendEmail;
