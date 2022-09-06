const Sequelize = require('sequelize');
const DB_Ecommerce = require('../../config/DB_Ecommerce');

// Create Model
const ShippingAdress = DB_Ecommerce.define('shippingAddress', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fullName: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    postalCode: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    },
}, {
    timestamps: false
});

module.exports = ShippingAdress;
