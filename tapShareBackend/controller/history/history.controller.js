const CodeModal = require("../../model/textModel");
const FileModal = require("../../model/fileModel");

exports.getHistory = async (req, res) => {
  const ipAddress = req.params.id;

  const total = 10;
  try {
    if (!ipAddress)
      return res.status(200).json({
        message: "Please provide ipAddress",
        status: 200,
      });
    const codes = await CodeModal.find({ ipAddress })
      .sort({ createdAt: -1 })
      .limit(total);
    const files = await FileModal.find({ ipAddress })
      .sort({ createdAt: -1 })
      .limit(total);
    if (codes?.length <= 0 && files?.length <= 0) {
      return res.status(200).json({ message: "No history found", status: 200 });
    }
    return res.status(200).json({ codes, files, status: 200 });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};
// get all
exports.getAllHistory = async (_, res) => {
  try {
    // const codes = await CodeModal.find();
    const files = await FileModal.find();
    const ipAddress = [...files].filter((item) => item.ipAddress);
    // if (codes?.length <= 0 && files?.length <= 0) {
    //   return res.status(200).json({ message: "No history found", status: 200 });
    // }
    return res.status(200).json({ ipAddress, status: 200 });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
};

// // gets files that contains ipAddress
// const ipAddress = [...codes, ...files].filter((item) => item.ipAddress);
