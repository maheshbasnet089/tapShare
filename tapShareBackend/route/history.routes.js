const router = require("express").Router();
const {
  getHistory,
  getCodeDetails,
  getFileDetails,
} = require("../controller/history/history.controller");

router.get("/code/:id", getCodeDetails);
router.get("/file/:id", getFileDetails);
router.get("/:id", getHistory);

module.exports = router;
