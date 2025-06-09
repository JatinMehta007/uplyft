const express = require('express');
const router = express.Router();
const { chatQuery } = require('../controller/chatController');

router.post('/', chatQuery);

module.exports = router;