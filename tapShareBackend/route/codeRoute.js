const {
  createCode,
  getCode,
  getSingleCode,
} = require("../controller/Code/codeController");

const router = require("express").Router();

router.route("/code").post(createCode);

router.route("/code/single/:id").get(getSingleCode);
router.route("/code/:id").get(getCode);

module.exports = router;
