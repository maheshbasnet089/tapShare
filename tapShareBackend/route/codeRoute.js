const {
  createCode,
  getCode,
  getSingleCode,
  createCodeWithVSCode,
} = require("../controller/Code/codeController");

const router = require("express").Router();

router.route("/code").post(createCode);
router.route("/vscode").post(createCodeWithVSCode);

router.route("/code/single/:id").get(getSingleCode);
router.route("/code/:id").get(getCode);

module.exports = router;
