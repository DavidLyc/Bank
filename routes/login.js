const express = require('express');
const app = express();
const url = require("url");
const fs = require("fs");

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
            case '/validLogin':
                break;
        }
    }
);

module.exports = app;

// router.get('/', function (req, res, next) {
//     res.render('login', {title: 'Express'});
// });
//
// router.get('/validLogin', (req, res) => {
//     console.log(JSON.stringify(req));
//     res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
//     // const cardNum = req.query.account;
//     // const password = req.query.password;
//     // console.log(cardNum);
//     // console.log(password);
//     // user_db.isLoginValid(cardNum, password)
//     //     .then(users => {
//     //         if (JSON.stringify(users) !== '[]') {
//     //             res.end('登陆成功');
//     //         }
//     //         else {
//     //             res.end('登录失败');
//     //         }
//     //     });
// });

// <!DOCTYPE html><meta charset="UTF-8"> <script>alert("登陆成功!"); </script>
