const { sendFiles, deleteShare } = require("../controller/email/fileController");

const router = require("express").Router();
const { multer, storage } = require("../services/multerConfig");
const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024, files: 10 },
});

router.route("/sendFile").post(upload.array("files"), sendFiles);
router.delete("/share/:userId", deleteShare);
router.post("/share/:userId/delete", deleteShare);

module.exports = router;
