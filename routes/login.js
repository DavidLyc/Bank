const express = require('express');
const app = express();
const url = require("url");
const fs = require("fs");
const card_db = require('../db/card_db');

app.get('/*', (req, res) => {
        const pathname = url.parse(req.url).pathname;
        switch (pathname) {
            case '/':
                res.writeHead(200, {"Content-Type": "text/html"});
                fs.readFile("./views/login.ejs", "utf-8", (err, data) => {
                    res.write(data);
                    res.end();
                });
                break;
        }
    }
);

app.post('/*', (req, res) => {
    const pathname = url.parse(req.url).pathname;
    switch (pathname) {
        case '/':
            const postJson = JSON.parse(JSON.stringify(req.body));
            card_db.validateLogin(postJson.cardNum, postJson.password)
                .then(result => {
                    res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
                    if (JSON.stringify(result) !== '[]') {
                        req.session.loginUser = postJson.cardNum;
                        res.end('pass');
                    } else {
                        res.end('deny');
                    }
                });
            break;
    }
});

module.exports = app;
