const { createUser, login } = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../authentication/validateToken");
const multer  = require('multer');
const upload = multer();

//pass in URL and controller
router.post("/create", createUser);
router.post("/login", login);

module.exports = router;
