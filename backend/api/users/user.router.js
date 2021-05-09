const { createUser, login, authenticateUser } = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../authentication/validateToken");

//pass in URL and controller
router.post("/create", createUser);
router.post("/login", login);
router.post("/authenticate", checkToken, authenticateUser);

module.exports = router;
