const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const codeSchema = new Schema({
  text: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  ipAddress :{
    type : String,
    required : true
  }
},{
  timestamps:true
});

const Code = mongoose.model("Code", codeSchema);
module.exports = Code;
