// configuration NodeMailer
var express = require('express');
var router = express.Router();
const ejs = require("ejs");
var nodemailer = require('nodemailer');
const creds = require('../config/NodeMailer');
var htmlspecialchars = require('htmlspecialchars');


// var bcrypt = require('bcrypt');

var transport = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: creds.USER, // generated ethereal user
        pass: creds.PASS // generated ethereal password
    }
};
var transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});

router.post('/SendMail', (req, res, next) => {
    delete req.body._id;
    var name = htmlspecialchars(req.body.name);
    var email = htmlspecialchars(req.body.email);
    var phone = htmlspecialchars(req.body.phone);
    var message = htmlspecialchars(req.body.message);
    var localisation = htmlspecialchars(req.body.localisation);
    const event = new Date();
    var content = `<strong>Name:</strong>  ${name}. <br/> \n <strong> E-mail:</strong> ${email} .\n  <br/><strong> Phone: </strong>+${phone}.\n  <br/><strong> Message:</strong> ${message}.<br/>  \n<strong> Localisation </strong> ${localisation}.<br/> `;

    let mail = {
        from: `"${name} 👻" <${email}>`, // sender address
        to: "ilyaskritet@gmail.com", // list of receivers
        subject: "Hello ✔",
        // Subject line
        html: content // html body
    };
    //console.log("html data ======================>", mainOptions.html);
    transporter.sendMail(mail, (err, mail) => {
        if (err) {
            res.status(401).json({
                msg: 'fail'
            });
        } else {

            console.log("Message sent: %s", mail.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mail));


            res.status(201).json({
                msg: 'success'

            });



        }
    });


});


/*let mail = {
    from: `"${name} 👻" <${email}>`, // sender address
    to: "filyas264@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: `${content}`, // plain text body
    html: `<p>${content}</p>` // html body
};

transporter.sendMail(mail, (err, mail) => {
    if (err) {
        console.log("Message faild : %s", mail.err)
        res.status(401).json({
            msg: 'fail'
        });
    } else {
        console.log("Message sent: %s", mail.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mail));
        res.status(200).json({
            msg: 'success'
        });
    }
});*/


module.exports = router;


