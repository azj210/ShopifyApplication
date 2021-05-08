const { createUser, login } = require("./user.controller");
const router = require("express").Router();

//pass in URL and controller
router.post("/create", createUser);
router.post("/login", login);

module.exports = router;
