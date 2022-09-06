const Sequelize = require('sequelize');
const DB_Ecommerce = require('../../config/DB_Ecommerce');

// Create Model
const Produit = DB_Ecommerce.define('produit', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        unique:true
    },
    image: {
        type: Sequelize.STRING
    },
    brand: {
        type: Sequelize.STRING
    },
    category: {
        type: Sequelize.INTEGER,
        references: {
            model: 'categories',
            key: 'fk_produits_categorie'
        }
    },
    description: {
        type: Sequelize.TEXT
    },
    price: {
        type: Sequelize.DECIMAL
    },
    countInStock: {
        type: Sequelize.INTEGER
    },
    rating: {
        type: Sequelize.FLOAT
    },
    numReviews: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
});

module.exports = Produit;
