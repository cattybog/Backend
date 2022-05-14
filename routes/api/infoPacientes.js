const express = require('express');
const router = express.Router();
const bd = require('../../bd');

let auth = function (req, res, next) {
    if (req.session.authenticated)
        return next();
    else
        return res.sendStatus(401);
};

module.exports = router;