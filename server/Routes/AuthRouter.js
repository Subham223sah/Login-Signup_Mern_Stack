const {signup, login}  = require('../Controllers/AuthControll');
const { signupValidation, loginValidation } = require('../Middlewares/validation');

const router = require('express').Router();

// const express = require('express');
// const router = express.Router();

router.post('/login', loginValidation, login)

router.post('/signup', signupValidation, signup)

module.exports = router;