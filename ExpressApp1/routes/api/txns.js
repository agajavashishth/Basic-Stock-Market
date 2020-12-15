const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const Txn = require("../../models/Txn");
const { getStockbySym } = require('../../logic/stocks');

// @route POST api/txns
// @desc add new transaction
// @access Private

router.post("/", passport.authenticate('jwt', { session: false }),
    function (req, res) {
        // Form validation
        const { errors, isValid } = validateTxnInput(req.body);
        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        const newTxn = new Txn({
            symbol: req.body.symbol,
            volume: req.body.volume,
            email: req.user.email,
            price: getStockbySym(req.body.symbol, stockBase),
            type: req.body.type,
            status: false
        });
    });



// @route GET api/txns
// @desc Login user and return JWT token
// @access Public
router.get("/", (req, res) => {
    // Form validation
    const { errors, isValid } = validateTxnOutput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});


module.exports = router;
