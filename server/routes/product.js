const express = require('express');
const data = require('./data.js');

const expressAsyncHandler = require('express-async-handler');

const router = express.Router();
let Product = require('../models/Product/Produit');
let Category = require('../models/Product/Category');
const { isAdmin, isAuth } = require("../middleware/auth");
let Review = require('../models/Product/Review');
const sequelize = require('sequelize');
const Produit = require('../models/Product/Produit');
let User = require('../models/users/Utilisateur');


router.get(
  '/products',
  expressAsyncHandler(async (req, res) => {
    const name = req.query.name || '';
    const productId = req.query.productId || '';
    const category = req.query.category || '';
    const nameFilter = name ? { name: { [sequelize.Op.like]: "%" + name.toLocaleLowerCase() + "%" } } : {};
    const productIdFilter = productId ? { id: productId } : {};
    const categoryFilter = category ? { category: category } : {};
    let products = null;
    if (name || productId || category)
      products = await Product.findAll({
        where: {
          [sequelize.Op.or]: [
            nameFilter,
            productIdFilter,
            categoryFilter
          ]
        }
      });
    else
      products = await Product.findAll({});

    res.json(products);
  })
);

router.get(
  '/products/insert',
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const createdProducts = await Product.bulkCreate(data.products);
    res.send(createdProducts);
  })
);


router.post(
  '/products/insert',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: 'samle name ' + Date.now(),
      image: '/img/unknown.png',
      price: 0,
      category: 3,
      brand: 'sample brand',
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: 'sample description',
    });
    const createdProduct = await product.save();

    res.send({ message: 'Product Created', product: JSON.parse(JSON.stringify(createdProduct)) });
  })
);

router.put(
  '/products/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);
    if (product) {


      const productUpdate = await Product.update({
        name: req.body.name, price: req.body.price, image: req.body.image,
        category: req.body.category,
        brand: req.body.brand,
        countInStock: req.body.countInStock,
        description: req.body.description
      }, { where: { id: product.id } });

      res.send({ message: 'Product Updated', product: JSON.parse(JSON.stringify(productUpdate)) });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

router.get(
  '/products/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (product) {

      const category = await Category.findAll({});
      product.categories = JSON.parse(JSON.stringify(category));

      const reviews = await Review.findAll({ where: { id_product: product.id } });

      let user = null;
      let table = [];
      await Promise.all(
        reviews.map(async (e) => {
          user = await User.findOne({ where: { id: e.id_user } });
          e.name = user.name;
        }));
      
      product.reviews = reviews;
      res.json(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

router.delete(
  '/products/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      const deleteProduct = await Product.destroy({ where: { id: product.id } });
      res.send({ message: 'Product Deleted', product: JSON.parse(JSON.stringify(deleteProduct)) });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);


router.post(
  '/products/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Produit.findByPk(productId);
    if (product) {

      const review = await Review.findAll({ where: { id_product: product.id } })
      if (review.find((x) => x.id_user === req.user.id)) {
        return res
          .status(400)
          .send({ message: 'Vous avez déjà soumis un avis' });
      }

      const newReview = await Review.create({ id_product: product.id, id_user: req.user.id, comment: req.body.comment, rating: Number(req.body.rating),createAt:new Date() });

      const afterUpdate = await Review.findAll({ where: { id_product: product.id } });
      let rating =
        afterUpdate.reduce((a, c) => c.rating + a, 0) /
        afterUpdate.length;

      let numReviews = afterUpdate.length;

      const updateProduct = await Produit.update({
        rating: rating,
        numReviews: numReviews
      }, { where: { id: product.id } });


      newReview.name = req.user.name;

      res.status(201).send({
        message: 'Review Created',
        review: newReview,
      });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);


module.exports = router;