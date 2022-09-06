const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const expressAsyncHandler = require('express-async-handler');
const data = require('./data.js')
const { generateToken, isAuth, isAdmin } = require('../middleware/auth');
const nodemailer = require('nodemailer');
const isEmpty = require('is-empty');

const { Op } = require("sequelize");



const router = express.Router();

// Models
let User = require('../models/users/Utilisateur');


router.get(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const users = await User.findAll();
        res.send(users);
    })
);



router.get(
    '/insert',
    expressAsyncHandler(async (req, res) => {
        // await User.remove({});
        console.log(data);
        const createdUsers = await User.bulkCreate(data.users);
        res.send({ createdUsers });
    })
);

router.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send({ message: 'User Not Found' });
        }
    })
);


router.put(
    '/profile',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const user = await User.findByPk(req.user.id);
        let updatedUser;
        if (user) {

            const name = req.body.name || user.name;
            const email = req.body.email || user.email;
            if (req.body.password) {
                await User.update({ name: name, email: email, password: bcrypt.hashSync(req.body.password, 8) }, { where: { id: user.id } });
            }
            else {
                await User.update({ name: name, email: email }, { where: { id: user.id } });
            }
            const updatedUser = await User.findByPk(req.user.id);
            res.json({
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser),
            });
        }
    })
);

router.post(
    '/signin',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({ where: { [Op.or]: { email: req.body.email, name: req.body.email } } });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.status(200).json({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user),
                });
                return;
            }
        }
        res.status(401).send({ message: 'Invalid email or password' });
    })
);



router.post('/recoverPWD', (req, res) => {
    const email = !isEmpty(req.body.email) ? req.body.email : "";
    User.findOne({
        where: { email: email }
    }).then((user) => {
        if (!user) {
            res.status(400).json({ emailSent: false, recoverEmail: "Email n'existe pas" });
        } else {
            // jwt Token
            jwt.sign(
                { id: user.id },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    // mail
                    let transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 587,
                        secure: false, // true for 465, false for other ports
                        auth: {
                            user: process.env.EMAIL,
                            pass: process.env.EMAIL_PASSWORD// generated ethereal password
                        }
                    });
                    transporter.sendMail({
                        from: '"Easly Informatique" <ilyaskritet@gmail.com>',
                        to: "ilyaskritet@gmail.com",
                        subject: "Récupérer Mot de passe",
                        html: "<h1>Récuperation de Mot de passe</h1><h3>Bonjour " + user.name + ",</h3><p>Pour récuperer votre mot de passe veuillez suivre le lien suivant : <a href='http://localhost:3000/recover_password/" + token + "'> Récupérer mon Mot de passe</a></p><p><b>Le lien expire dans 60 minutes!</b></p>"
                    }, (err, info) => {
                        if (err) {
                            return console.log(err);
                        }
                    });
                    // res
                    res.status(200).json({ emailSent: true });
                }
            );
        }
    })
        .catch(err => console.log(err));
});

router.post('/resetPWD', (req, res) => {
    let NewPassword = req.body.password;
    let token = req.body.token;
    try {
        // Verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // cript new password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(NewPassword, salt, (err, hash) => {
                if (err) {
                    console.log(err);
                } else {
                    let motDePasse = hash;
                    // find user
                    User.update(
                        { password: motDePasse },
                        { where: { id: decoded.id } }
                    )
                        .then((user) => {
                            res.status(200).json({ updated: true });
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            });
        });
    } catch (e) {
        res.status(400).json({ updated: false, msg: 'token non valid' });
    }
});

router.post(
    '/register',
    expressAsyncHandler(async (req, res) => {
        const existe = await User.findOne({ where: { email: req.body.email } });
        if (existe == null) {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8)
            });
            const createdUser = await user.save();
            res.status(200).json({
                id: createdUser.id,
                name: createdUser.name,
                email: createdUser.email,
                isAdmin: createdUser.isAdmin,
                token: generateToken(createdUser),
            });
        }
        else
            res.status(401).send({ message: 'e-mail existe déjà' });

    })
);


router.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const user = await User.findByPk(req.params.id);
        if (user) {
            if (user.email === 'admin@example.com') {
                res.status(400).send({ message: 'Can Not Delete Admin User' });
                return;
            }
            const deleteUser = await User.destroy({ where: { id: user.id } });
            res.send({ message: 'User Deleted', user: deleteUser });
        } else {
            res.status(404).send({ message: 'User Not Found' });
        }
    })
);


router.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const user = await User.findByPk(req.params.id);
        if (user) {
            const name = req.body.name || user.name;
            const email = req.body.email || user.email;
            const isSeller = req.body.isSeller === user.isSeller ? user.isSeller : req.body.isSeller;
            const isAdmin = req.body.isAdmin === user.isAdmin ? user.isAdmin : req.body.isAdmin;
            const updatedUser = await User.update({ name: name, email: email, isSeller: isSeller, isAdmin: isAdmin }, { where: { id: user.id } });
            res.send({ message: 'User Updated', user: updatedUser });
        } else {
            res.status(404).send({ message: 'User Not Found' });
        }
    })
);


module.exports = router;