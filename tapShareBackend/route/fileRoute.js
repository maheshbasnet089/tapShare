const { sendFiles } = require("../controller/email/fileController");

const router = require("express").Router();
const { multer, storage } = require("../services/multerConfig");
const upload = multer({ storage: storage });

router.route("/sendFile").post(upload.array("files"), sendFiles);

module.exports = router;
