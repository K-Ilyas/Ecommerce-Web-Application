const Sequelize = require('sequelize');
const DB_Ecommerce = require('../../config/DB_Ecommerce');

// Create Model
const PaymentResult = DB_Ecommerce.define('paymentResult', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_transaction :
    {
        type: Sequelize.STRING

    },
      status: {
        type: Sequelize.STRING
    },
    update_time: {
        type: Sequelize.DATE
    },
    email_address: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});

module.exports = PaymentResult;
