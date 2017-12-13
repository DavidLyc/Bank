const express = require('express');
const app = express();
const card_db = require('../db/card_db');
const url = require("url");
const fs = require("fs");

app.get('/*', (req, res) => {
    const pathname = url.parse(req.url).pathname;
    switch (pathname) {
        case '/modifyPassword':
            fs.readFile("views/modify_password.ejs", "utf-8", (err, data) => {
                res.write(data);
                res.end();
            });
            break;
    }
});

app.post('/*', (req, res) => {
    const pathname = url.parse(req.url).pathname;
    switch (pathname) {
        case '/resetPassword':
            card_db.resetPassword(req.session.loginUser)
                .then(() => res.end())
                .catch(err => console.error(err));
            break;
        case '/modifyPassword':
            const postJson = JSON.parse(JSON.stringify(req.body));
            const oldPassword = postJson.oldPass;
            const newPassword = postJson.newPass;
            if (oldPassword !== req.session.loginPassword) {
                res.end('原密码错误，请重新输入！');
            } else {
                card_db.modifyPassword(req.session.loginUser, newPassword)
                    .then(() => res.end('修改成功！'))
                    .catch(err => console.error(err));
            }
            break;
    }
});

module.exports = app;