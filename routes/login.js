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
        case '/postLogin':
            const postJson = JSON.parse(JSON.stringify(req.body));
            card_db.validateLogin(postJson.cardNum, postJson.password)
                .then(result => {
                    res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
                    if (JSON.stringify(result) !== '[]') {
                        res.end('success!');
                    } else {
                        res.end('failed!');
                    }
                });
            break;
    }
});

module.exports = app;
