const Sequelize = require('sequelize');
const DB_Ecommerce = require('../../config/DB_Ecommerce');

// Create Model
const Utilisateur = DB_Ecommerce.define('utilisateur', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },

    password: {
        type: Sequelize.STRING
    },
    isAdmin: {
        type: Sequelize.BOOLEAN
    },
    isSeller: {
        type: Sequelize.BOOLEAN
    }
}, {
    timestamps: false
});

module.exports = Utilisateur;
