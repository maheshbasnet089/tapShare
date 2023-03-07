const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const twilio = require("twilio")(accountSid, authToken, {
  lazyLoading: true,
});

const sendSms = async (options) => {
  console.log(options, "options");
  return await twilio.messages.create({
    body: `Tapshare: ${options.text} `,
    from: process.env.TWILIO_NUMBER,
    to: "+977" + options.to,
  });
};

module.exports = sendSms;
