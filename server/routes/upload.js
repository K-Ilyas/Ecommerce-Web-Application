const multer = require('multer');
const express = require('express');
const { isAuth } = require('../middleware/auth');

const router = express.Router();

const dir = `public/api/img/`;

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, dir);
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}.jpg`);
    },
});

const upload = multer({ storage });

router.post('/insert', isAuth, upload.single('image'), (req, res) => {
    res.send(`/${req.file.path.replace(/\\/g, "/").substring("/public/api".length)}`);
});

module.exports=router;