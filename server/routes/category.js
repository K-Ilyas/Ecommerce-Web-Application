const express = require('express');
const data = require('./data.js');
const expressAsyncHandler = require('express-async-handler');
const router = express.Router();
let Category = require('../models/Product/Category');


router.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        const categories = await Category.findAll({});
        res.json(categories);
    })
);




module.exports = router;