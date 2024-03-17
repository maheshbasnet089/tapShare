const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const codeSchema = new Schema(
  {
    text: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
    },
    ipAddress: {
      type: String,
      required: true,
      index: true,
    },
    vscode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
codeSchema.index({ createdAt: 1 }, { expireAfterSeconds: 15 * 24 * 60 * 60 });
const Code = mongoose.model("Code", codeSchema);
module.exports = Code;
