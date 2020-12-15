'use strict';
var express = require('express');
var router = express.Router();

/* GET Login page. */
router.get('/', function (req, res) {
    res.render('login', { title: 'Login' });
});

module.exports = router;
