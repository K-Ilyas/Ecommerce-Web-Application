const Sequelize = require('sequelize');
const DB_Ecommerce = require('../../config/DB_Ecommerce');

// Create Model
const Order = DB_Ecommerce.define('order', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    paymentMethod: {
        type: Sequelize.STRING
    },
    itemsPrice: {
        type: Sequelize.DECIMAL
    },
    shippingPrice: {
        type: Sequelize.DECIMAL
    },
    taxPrice: {
        type: Sequelize.DECIMAL
    },
    totalPrice: {
        type: Sequelize.DECIMAL
    },
    user: {
        type: Sequelize.INTEGER,
        references: {
            model: 'utilisateurs',
            key: 'fk_user_orders'
        }
    },
    isPaid: {
        type: Sequelize.BOOLEAN,

    },
    paidAt: {
        type: Sequelize.DATE,

    },
    isDelivered: {
        type: Sequelize.BOOLEAN,

    },
    deliveredAt: {
        type: Sequelize.DATE,

    },
    shippingAddress: {
        type: Sequelize.INTEGER,
        references: {
            model: 'shippingaddresses',
            key: 'fk_shippingAddress_orders'
        }

    },
    paymentResult:
    {
        type: Sequelize.INTEGER,
        references: {
            model: 'paymentresults',
            key: 'fk_paymentResult_orders'
        }

    },
    createdAt: {
        type:  Sequelize.DATE,
        defaultValue: new Date(),
        allowNull: false
    }

}, {
    timestamps: false
});

module.exports = Order;
