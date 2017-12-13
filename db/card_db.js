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
            type: Sequelize.INTEGER(20)
        },
        password: Sequelize.STRING(20),
        username: Sequelize.STRING(20),
        balance: Sequelize.FLOAT,
        idnum: Sequelize.STRING(20),
        cardnum: Sequelize.INTEGER(20)
    }, {
        timestamps: false
    }
);

//验证登陆
exports.validateLogin = (cardNum, password) => {
    return Card.findAll({
        limit: 1,
        where: {
            cardnum: cardNum,
            password: password
        }
    });
};

//修改密码
exports.modifyPassword = (cardNum, newPassword) => {
    return Card.update(
        {password: newPassword},
        {where: {cardnum: cardNum}}
    );
};

//重置密码
exports.resetPassword = (cardNum) => {
    return Card.update(
        {password: '123456'},
        {where: {cardnum: cardNum}}
    );
};