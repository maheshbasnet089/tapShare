const router = require("express").Router();
const {
  getHistory,
  getAllHistory,
  getCodeDetails,
} = require("../controller/history/history.controller");

router.get("/all", getAllHistory);
router.get("/code/:id", getCodeDetails);
router.get("/:id", getHistory);

module.exports = router;
