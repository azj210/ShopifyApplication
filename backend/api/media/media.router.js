const { addImage, deleteImage, getImageByName, getImagesBySpec } = require("./media.controller");
const router = require("express").Router();
const { checkToken } = require("../../authentication/validateToken");
const multer  = require('multer');
const upload = multer();

router.post("/add", upload.single("file"), checkToken, addImage);
router.post("/delete", checkToken, deleteImage);
router.post("/getByName", checkToken, getImageByName);
router.post("/getBySpec", checkToken, getImagesBySpec);


module.exports = router;
