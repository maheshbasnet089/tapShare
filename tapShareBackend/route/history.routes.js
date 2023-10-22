const router = require("express").Router();
const {
  getHistory,
  getAllHistory,
} = require("../controller/history/history.controller");

router.get("/all", getAllHistory);
router.get("/:id", getHistory);

module.exports = router;
