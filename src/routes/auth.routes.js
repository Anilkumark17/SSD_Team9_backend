<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const { LoginAPI } = require("../controller/auth.controller");

router.post("/login", LoginAPI);

module.exports = router;

=======
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
>>>>>>> 3a258ec177fba08efe49543d6fd47e3534dd6a72
