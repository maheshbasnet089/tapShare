const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    ipAddress: {
      type: String,
      required: true,
      index: true,
    },
    path: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
fileSchema.index({ createdAt: 1 }, { expireAfterSeconds: 15 * 24 * 60 * 60 });

const File = mongoose.model("File", fileSchema);

module.exports = File;
