const express = require('express');
const app = express();
const url = require("url");
const fs = require("fs");
const card_db = require('../db/card_db');

app.get('/*', (req, res) => {
        const pathname = url.parse(req.url).pathname;
        switch (pathname) {
            case '/':
                fs.readFile("views/login.ejs", "utf-8", (err, data) => {
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
                    if (JSON.stringify(result) !== '[]') {
                        req.session.loginUser = postJson.cardNum;
                        req.session.loginPassword = postJson.password;
                        res.end('pass');
                    } else {
                        res.end('银行卡号或密码错误！');
                    }
                });
            break;
    }
});

module.exports = app;
