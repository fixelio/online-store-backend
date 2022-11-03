const express = require('express');
const {
	signUp,
	signIn
} = require('../controller/auth.controller.js');

const use = require('../middleware/useController.js');

const router = express.Router();

router.post('/login', use(signIn));

router.post('/signup', use(signUp));

module.exports = router;