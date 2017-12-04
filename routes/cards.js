const express = require('express');
const app = express();
const router = express.Router();
const card_db = require('../db/card_db');
const url = require("url");

app.get('/*', (req, res) => {
    const pathname = url.parse(req.url).pathname;
    switch (pathname) {
        case '/allCards':
            res.writeHead(200, {"Content-Type": "application/json;charset=utf-8"});
            card_db.getAllCards()
                .then(cards => {
                    res.end(JSON.stringify(cards));
                }).catch(err => console.error(err));
            break;
    }
});

//存款
router.get('/addBalance', (req, res) => {
    res.writeHead(200, {"Content-Type": "application/json;charset=utf-8"});

});

module.exports = app;