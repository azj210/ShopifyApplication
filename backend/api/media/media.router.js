//const {  } = require("./media.controller");
const router = require("express").Router();
const { checkToken } = require("../../authentication/validateToken");
const multer  = require('multer');
const upload = multer();

module.exports = router;
