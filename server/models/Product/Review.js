const Sequelize = require('sequelize');
const DB_Ecommerce = require('../../config/DB_Ecommerce');

// Create Model
const Review = DB_Ecommerce.define('review', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,

    },

    id_product: {
        type: Sequelize.INTEGER,
        references: {
            model: 'produits',
            key: 'fk_reviews_produit'
        }
    },
    id_user: {
        type: Sequelize.INTEGER,
        references: {
            model: 'utilisateurs',
            key: 'fk_reviews_user'
        }
    },
    comment: {
        type: Sequelize.STRING
    },
    rating: {
        type: Sequelize.FLOAT
    },
    createAt:{
        type: Sequelize.DATE
    }
}, {
    timestamps: false
});

module.exports = Review;
