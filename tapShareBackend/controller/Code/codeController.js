const Code = require("../../model/textModel");
const schedule = require("node-schedule");
const scheduleDeletion = (codeId) => {
  const deletionJob = schedule.scheduleJob(
    new Date(Date.now() + 24 * 60 * 60 * 1000),
    async () => {
      try {
        const code = await Code.findByIdAndDelete(codeId);
      } catch (error) {
        console.log("Error deleting code:", error);
      }
    }
  );
};
exports.createCode = async (req, res) => {
  try {
    const { text, userId, title } = req.body;

    const codessAssociatedWithUserId = await Code.find({
      userId : req.body.userId,
    })
    // if find,check again the ip of that files 
    
    if(codessAssociatedWithUserId.length !==0  ){
      // loop and check 
      for(var i = 0;i<codessAssociatedWithUserId.length;i++){
        
        if(codessAssociatedWithUserId[i].ipAddress){
          if(codessAssociatedWithUserId[i].ipAddress !== req.body.ipAddress){
            return res.json({
              status : 400,
              messge : "Please don't use other's userId"
            })
          }
        }
        
      }


    }

    const code = await Code.create({
      text,
      userId,
      title,
      ipAddress : req.body.ipAddress
    });
    if (code) {
      // scheduleDeletion(code._id);
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
