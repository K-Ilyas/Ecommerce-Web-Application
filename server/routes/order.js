const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const router = express.Router();
let Order = require('../models/Product/Order');
// let OrderItem = require('../models/Product/OrderItem');
let OrderLink = require('../models/Product/OrderLink');
let ShippingAdress = require('../models/Product/ShippingAddress');
let PayementResult = require('../models/Product/PaymentResult');
const { isAuth, isAdmin } = require('../middleware/auth');
const { Op } = require('sequelize');
const Produit = require('../models/Product/Produit');
const sequelize = require('sequelize');
let User = require('../models/users/Utilisateur');




Produit.hasMany(OrderLink, {foreignKey: 'id_item'})
OrderLink.belongsTo(Produit, {foreignKey: 'id_item'})

router.post(
    '/insert',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        if (req.body.orderItems.length === 0) {
            res.status(400).send({ message: 'Cart is empty' });
        } else {

            // const orderItems = await OrderItem.bulkCreate(req.body.orderItems);
            const shippingAdress = await ShippingAdress.create(req.body.shippingAddress);
            const order = new Order({
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                user: req.user.id,
                shippingAddress: shippingAdress.id,
                createdAt: new Date()
            });
            
            const createdOrder = await order.save();
            let table = [];
            req.body.orderItems.map(async (e) => {
                table.push({ id_item: e.product, id_order: createdOrder.id ,qty:e.qty});
                 await Produit.update({ countInStock: sequelize.literal(`countInStock - ${e.qty}`) }, { where: { id: e.product } });
            });


            const createLink = await OrderLink.bulkCreate(table);

            const ordercreated = {
                id: order.id,
                orderItems: JSON.parse(JSON.stringify(req.body.orderItems)),
                shippingAddress: JSON.parse(JSON.stringify(shippingAdress)),
                paymentMethod: order.paymentMethod,
                itemsPrice: order.itemsPrice,
                shippingPrice: order.shippingPrice,
                taxPrice: order.taxPrice,
                totalPrice: order.totalPrice,
                user: order.user,
                isPaid: order.isPaid,
                paidAt: order.paidAt,
                isDelivered: order.isDelivered,
                deliveredAt: order.deliveredAt
            }

            res
                .status(201)
                .json({ message: 'New Order Created', order: ordercreated });
        }
    })
);

router.get(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const orders = await Order.findAll({});
        var table = [];
        let a;
        await Promise.all(
            orders.map(async (order) => {
                table.push({
                    id: order.id,
                    shippingAddress: order.shippingAddress,
                    paymentMethod: order.paymentMethod,
                    itemsPrice: order.itemsPrice,
                    shippingPrice: order.shippingPrice,
                    taxPrice: order.taxPrice,
                    totalPrice: order.totalPrice,
                    user: await User.findOne({ where: { id: order.user } }),
                    isPaid: order.isPaid,
                    paidAt: order.paidAt,
                    isDelivered: order.isDelivered,
                    deliveredAt: order.deliveredAt,
                    createdAt: order.createdAt
                });

            }));
        console.log(table.length + "************************************");
        res.json(table);
    })
);

router.get(
    '/mine',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findAll({ where: { user: req.user.id } });
        if (order.length) {

            // order.map(async (order) => {
            //     const shippingAdress = await ShippingAdress.findOne({ where: { id: order.id }, raw: true });
            //     const orderLink = await OrderLink.findAll({ where: { id_order: order.id }, raw: true });
            //     let table = [];
            //     orderLink.map((e) => {
            //         table.push(e.id_item);
            //     });
            //     const orderItem = await OrderItem.findAll({ where: { id: { [Op.or]: table } }, raw: true });
            //     const paymentInfo = await PayementResult.findOne({ where: { id: order.paymentResult } });
            //     const orderSaved = {
            //         id: order.id,
            //         orderItems: JSON.parse(JSON.stringify(orderItem)),
            //         shippingAddress: JSON.parse(JSON.stringify(shippingAdress)),
            //         paymentResult: JSON.parse(JSON.stringify(paymentInfo)),
            //         paymentMethod: order.paymentMethod,
            //         itemsPrice: order.itemsPrice,
            //         shippingPrice: order.shippingPrice,
            //         taxPrice: order.taxPrice,
            //         totalPrice: order.totalPrice,
            //         user: order.user,
            //         isPaid: order.isPaid,
            //         paidAt: order.paidAt,
            //         isDelivered: order.isDelivered,
            //         deliveredAt: order.deliveredAt
            //     };
            //     dataOrder.push(orderSaved);
            // });
            res.json(order);
        } else {
            res.status(404).send({ message: 'Order Not Found' });
        }
    })
);


router.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findByPk(req.params.id);
        if (order) {

            const shippingAdress = await ShippingAdress.findOne({ where: { id: order.shippingAddress }, raw: true });
            const orderLink = await OrderLink.findAll({ where: { id_order: order.id },raw: true });

            let orderItem =[];

            let produit=null;
            await Promise.all(

            orderLink.map(async (e)=>{

            produit =await Produit.findOne({ where: { id: e.id_item },raw: true });

            orderItem.push({
                    name:produit.name,
                    image:produit.image,
                    price:produit.price,
                    product:produit.id,
                    qty:e.qty
                });            
            }));

           


            const orderSaved = {
                id: order.id,
                orderItems: JSON.parse(JSON.stringify(orderItem)),
                shippingAddress: JSON.parse(JSON.stringify(shippingAdress)),
                paymentMethod: order.paymentMethod,
                itemsPrice: order.itemsPrice,
                shippingPrice: order.shippingPrice,
                taxPrice: order.taxPrice,
                totalPrice: order.totalPrice,
                user: order.user,
                isPaid: order.isPaid,
                paidAt: order.paidAt,
                isDelivered: order.isDelivered,
                deliveredAt: order.deliveredAt
            }
            res.json(orderSaved);
        } else {
            res.status(404).send({ message: 'Order Not Found' });
        }
    })
);



router.put(
    '/:id/pay',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findByPk(req.params.id);
        if (order) {
            console.log(order);

            const payementResult = await PayementResult.create({
                id_transaction: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address,
            });


            const payementInfo = {
                id: payementResult.id_transaction,
                status: payementResult.status,
                update_time: payementResult.update_time,
                email_address: payementResult.email_address
            };


            const updatedOrder = await Order.update({ isPaid: true, paidAt: new Date(), paymentResult: payementResult.id }, { where: { id: order.id } });

            const shippingAdress = await ShippingAdress.findOne({ where: { id: order.id }, raw: true });
            const orderLink = await OrderLink.findAll({ where: { id_order: order.id }, raw: true });

            let orderItem =[];

            let produit=null;
            await Promise.all(

            orderLink.map(async (e)=>{

            produit =await Produit.findOne({ where: { id: e.id_item },raw: true });

            orderItem.push({
                    name:produit.name,
                    image:produit.image,
                    price:produit.price,
                    product:produit.id,
                    qty:e.qty
                });            
            }));

            // let produit;
            // orderItem.map(async (e) => {

            //     produit = await Produit.update({ countInStock: sequelize.literal(`countInStock - ${e.qty}`) }, { where: { id: e.product } });

            // });

            const orderSaved = {
                id: order.id,
                orderItems: JSON.parse(JSON.stringify(orderItem)),
                shippingAddress: JSON.parse(JSON.stringify(shippingAdress)),
                paymentResult: JSON.parse(JSON.stringify(payementInfo)),
                paymentMethod: order.paymentMethod,
                itemsPrice: order.itemsPrice,
                shippingPrice: order.shippingPrice,
                taxPrice: order.taxPrice,
                totalPrice: order.totalPrice,
                user: order.user,
                isPaid: order.isPaid,
                paidAt: order.paidAt,
                isDelivered: order.isDelivered,
                deliveredAt: order.deliveredAt
            };




            res.json({ message: 'Order Paid', order: orderSaved });
        } else {
            res.status(404).send({ message: 'Order Not Found' });
        }
    })
);


router.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findByPk(req.params.id);
        if (order) {

            if (!order.isPaid || !order.isDelivered) {
                const orderLink = await OrderLink.findAll({ where: { id_order: order.id }, raw: true });
                let table = [];
                 
                // orderLink.map((e) => {
                //     table.push(e.id_item);
                // });
                // const orderItem = await OrderItem.findAll({ where: { id: { [Op.or]: table } }, raw: true });
                // let produit;

                orderLink.map(async (e) => {
                    await Produit.update({ countInStock: sequelize.literal(`countInStock + ${e.qty}`) }, { where: { id: e.id_item } });
                });
            }
            const deleteOrder = await Order.destroy({ where: { id: order.id } });
            res.json({ message: 'Order Deleted', order: JSON.parse(JSON.stringify(deleteOrder)) });
        } else {
            res.status(404).send({ message: 'Order Not Found' });
        }
    })
);


router.put(
    '/:id/deliver',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findByPk(req.params.id);
        if (order) {
            const updatedOrder = await Order.update({ isDelivered: true, deliveredAt: Date.now() }, { where: { id: order.id } });
            res.send({ message: 'Order Delivered', order: updatedOrder });
        } else {
            res.status(404).send({ message: 'Order Not Found' });
        }
    })
);



module.exports = router;