const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const login = require('./routes/login');
const card_db = require('./routes/cards');
const http = require("http");
const app = express();
const session = require('express-session');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: '12345',
    name: 'test',
    cookie: {
        maxAge: 1000 * 60 * 30  //cookie有效期30min
    },
    resave: false,
    saveUninitialized: true,
}));

//judge login
app.use((req, res, next) => {
    const url = req.originalUrl;
    if (url !== "/login" && !req.session.loginUser) {
        return res.redirect("/login");
    }
    next();
});

//url
app.use('/login', login);
app.use('/cards', card_db);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

http.createServer(app).listen(8888);
module.exports = app;
