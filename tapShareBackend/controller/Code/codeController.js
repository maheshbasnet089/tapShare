const Code = require("../../model/textModel");
exports.createCode = async (req, res) => {
  try {
    const { text, userId, title } = req.body;

    const codessAssociatedWithUserId = await Code.find({
      userId: req.body.userId,
    });
    // if find,check again the ip of that files

    if (codessAssociatedWithUserId.length !== 0) {
      // loop and check
      for (var i = 0; i < codessAssociatedWithUserId.length; i++) {
        if (codessAssociatedWithUserId[i].ipAddress) {
          if (codessAssociatedWithUserId[i].ipAddress !== req.body.ipAddress) {
            return res.json({
              status: 400,
              messge: "Please don't use other's userId",
            });
          }
        }
      }
    }
    const code = await Code.create({
      text,
      userId,
      title,
      ipAddress: req.body.ipAddress,
    });
    if (code) {
      res.status(201).json({
        status: 200,
        message: "Code created successfully",
        code: code,
      });
    } else {
      res.status(500).json({
        status: 500,
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

exports.getSingleCode = async (req, res) => {
  try {
    const code = await Code.findById(req.params.id);

    if (code) {
      return res.json({
        status: 200,
        code,
      });
    }
    res.json({
      status: 404,
      message: "Code Not Found",
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
};

exports.createCodeWithVSCode = async (req, res) => {
  const { text, userId, ipAddress } = req.body;
  try {
    const code = await Code.create({
      text,
      userId,
      ipAddress,
      vscode: Math.floor(100000 + Math.random() * 900000),
    });
    if (code) {
      return res.status(201).json({
        status: 201,
        message: "Code created successfully",
        code,
        vscode: code.vscode,
      });
    }
    res.status(500).json({
      status: 500,
      message: "Something went wrong",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const canDeleteShare = (shareUserId, storedIp, { ipAddress, clientUserId }) => {
  if (ipAddress && storedIp === ipAddress) return true;
  if (!clientUserId) return false;
  return shareUserId === clientUserId || shareUserId === `f${clientUserId}`;
};

exports.deleteCodeShare = async (req, res) => {
  const userId = req.params.userId;
  const { ipAddress, clientUserId } = req.body;

  if (!ipAddress && !clientUserId) {
    return res.status(400).json({
      message: "ipAddress or clientUserId is required",
      status: 400,
    });
  }

  try {
    const codes = await Code.find({ userId });
    if (!codes.length) {
      return res.status(404).json({ message: "No code found", status: 404 });
    }

    if (!canDeleteShare(userId, codes[0].ipAddress, { ipAddress, clientUserId })) {
      return res.status(403).json({
        message: "Not authorized to delete this share",
        status: 403,
      });
    }

    await Code.deleteMany({ userId });
    return res.json({ message: "Code share deleted successfully", status: 200 });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};

exports.getCodeWithVSCode = async (req, res) => {
  try {
    const vscode = req.params.vscode;
    const code = await Code.findOne({ vscode });
    if (code) {
      return res.status(200).json({
        status: 200,
        code,
      });
    }
    res.status(200).json({
      status: 404,
      message: "Code Not Found",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
