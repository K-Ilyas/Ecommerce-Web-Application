const Sequelize = require('sequelize');
const DB_Ecommerce = require('../../config/DB_Ecommerce');

// Create Model
const Category = DB_Ecommerce.define('categorie', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,

    },
    name: {
        type: Sequelize.STRING 
    },
    subCat :{
        type: Sequelize.INTEGER,
        references: {
            model: 'categories',
            key: 'fk_subCat_categories'
        }
    }

}, {
    timestamps: false
});

module.exports = Category;
