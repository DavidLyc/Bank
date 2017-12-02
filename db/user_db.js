const Sequelize = require('sequelize');

const sequelize = new Sequelize('bank', 'root', '123456', {
    dialect: 'mysql',
    host: 'localhost',
    port: '4306',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const User = sequelize.define('users', {
        id: {
            primaryKey: true,
            type: Sequelize.STRING
        },
        account: Sequelize.STRING,
        password: Sequelize.STRING
    }, {
        timestamps: false
    }
);

exports.isLoginValid = function (num, password) {
    return User.findAll({
        where: {
            account: num,
            password: password
        }
    });
};