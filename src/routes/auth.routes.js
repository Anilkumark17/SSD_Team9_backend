const express = require("express");
const router = express.Router();
const { LoginAPI } = require("../controller/auth.controller");

router.post("/login", LoginAPI);

module.exports = router;

