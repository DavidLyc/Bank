const express = require('express');
const url = require("url");
const fs = require("fs");
const app = express();

app.get('/*', (req, res) => {
        const pathname = url.parse(req.url).pathname;
        switch (pathname) {
            case '/':
                fs.readFile("views/home.ejs", "utf-8", (err, data) => {
                    res.write(data);
                    res.end();
                });
                break;
        }
    }
);

module.exports = app;