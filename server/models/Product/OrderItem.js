const Sequelize = require('sequelize');
const DB_Ecommerce = require('../../config/DB_Ecommerce');

// Create Model
const OrderItem = DB_Ecommerce.define('orderItem', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    qty: {
        type: Sequelize.INTEGER
    },
    image: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.DECIMAL
    },
    product: {
        type: Sequelize.INTEGER ,
        references: {
            model: 'produits',
            key: 'fk_orderitems_product'
        }
    },
}, {
    timestamps: false
});

module.exports = OrderItem;
