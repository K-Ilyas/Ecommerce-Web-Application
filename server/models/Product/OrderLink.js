const Sequelize = require('sequelize');
const DB_Ecommerce = require('../../config/DB_Ecommerce');

// Create Model
const OrderLink = DB_Ecommerce.define('orderlink', {
    id_item: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: 'orderitems',
            key: 'fk_id_order_OrderLinks'
        }
    },
    id_order: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: 'orders',
            key: 'fk_id_item_OrderLinks'
        }
    },
    qty: {
        type: Sequelize.INTEGER,
    },
}, {
    timestamps: false
});

module.exports = OrderLink;
