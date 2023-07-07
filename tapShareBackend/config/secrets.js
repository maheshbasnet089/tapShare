require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  EMAIL: process.env.EMAIL,
  EMAIL_APP_PASSWORD: process.env.PASSWORD,
  BASE_URL: process.env.baseUrl,
  TWILIO_SID: process.env.TWILIO_SID,
  TWILIO_TOKEN: process.env.TWILIO_TOKEN,
  TWILIO_NUMBER: process.env.TWILIO_NUMBER,
  TWILIO_VERIFICATION_SID: process.env.TWILIO_VERIFICATION_SID,
  DB_PASSWORD: process.env.DB_PASSWORD,
};
