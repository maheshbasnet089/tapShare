const {
  createCode,
  getCode,
  getSingleCode,
  createCodeWithVSCode,
  deleteCodeShare,
} = require("../controller/Code/codeController");

const router = require("express").Router();

router.route("/code").post(createCode);
router.route("/vscode").post(createCodeWithVSCode);
router.delete("/code/share/:userId", deleteCodeShare);
router.post("/code/share/:userId/delete", deleteCodeShare);

router.route("/code/single/:id").get(getSingleCode);
router.route("/code/:id").get(getCode);

module.exports = router;
