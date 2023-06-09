const Code = require("../../model/textModel");

exports.createCode = async (req, res) => {
  try {
    const { text, userId,title } = req.body;
  
    const code = await Code.create({
      text,
      userId,
      title,
    });
    if (code) {
      res.status(201).json({
        message: "Code created successfully",
        code: code,
      });
    } else {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: error.message,
    });
  }
};

exports.getCode = async (req, res) => {
  try {
    const codeFound = await Code.find({ userId: req.params.id });
  
    if (codeFound.length == 0) {
      return res.json({
        status: 404,
        message: "No code found",
      });
    }
    if (codeFound.length > 0) {
      res.json({
        status: 200,
        message: "Code found",
        code: codeFound,
      });
    } else {
      res.json({
        status: 404,
        message: "Code not found",
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: error.message,
    });
  }
};
