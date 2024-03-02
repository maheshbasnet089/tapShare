// const {
//   TWILIO_NUMBER,
//   TWILIO_SID: accountSid,
//   TWILIO_TOKEN: authToken,
// } = require("../config/secrets");

// const twilio = require("twilio")(accountSid, authToken, {
//   lazyLoading: true,
// });

// const sendSms = async (options) => {
//   try {
//     console.log(options);
//     return await twilio.messages.create({
//       body: `Tapshare: ${options.text} `,
//       from: TWILIO_NUMBER,
//       to: `+977${options.to}`,
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };

// module.exports = sendSms;
