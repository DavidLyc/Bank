const express = require('express');
const app = express();
const card_db = require('../db/card_db');
const url = require("url");

app.post('/*', (req, res) => {
    const pathname = url.parse(req.url).pathname;
    switch (pathname) {
        case '/resetPassword':
            card_db.resetPassword(req.session.loginUser)
                .then(() => {
                    res.end();
                }).catch(err => console.error(err));
            break;
    }
});

module.exports = app;