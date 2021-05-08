const { addImage, deleteImage, getImageByName, getImagesBySpec } = require("./media.controller");
const router = require("express").Router();
const { checkToken } = require("../../authentication/validateToken");

router.post("/add", upload.single("file"), checkToken, addImage);
router.delete("/delete", checkToken, deleteImage);
router.post("/getByName", checkToken, getImageByName);
router.post("/getBySpec", checkToken, getImagesBySpec);

module.exports = router;
