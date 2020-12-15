'use strict';
var express = require('express');
var router = express.Router();

/* GET trade page. */
router.get('/', function (req, res) {
    res.render('trade', { title: 'Trade' });
});

module.exports = router;
