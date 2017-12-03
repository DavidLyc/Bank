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

const Card = sequelize.define('cards', {
        id: {
            primaryKey: true,
            type: Sequelize.STRING
        },
        password: Sequelize.STRING,
        username: Sequelize.STRING,
        balance: Sequelize.STRING,
        cardnum: Sequelize.STRING
    }, {
        timestamps: false
    }
);

exports.getAllCards = () => {
    return Card.findAll({
        attributes: ['username', 'cardnum', 'balance']
    });
};

exports.validateLogin = (cardNum, password) => {
    return Card.findAll({
        limit: 1,
        where: {
            cardnum: cardNum,
            password: password
        }
    });
};