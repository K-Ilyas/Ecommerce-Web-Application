const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

const app = express();

// BodyParser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors
app.use(cors());

// Express session middleware
app.use(session({ secret: 'keyboard', resave: true, saveUninitialized: true }));
// dotenv
dotenv.config();


// Routes
app.use('/', express.static(path.join(__dirname, '/public')));
app.get('/', (req, res) => { res.send('INDEX'); });
app.use('/api/users', require('./routes/auth'));
app.use('/api/pro', require('./routes/product'));
app.use('/api/orders', require('./routes/order'));
app.use('/api/categories', require('./routes/category'));
app.use('/api/Email', require('./routes/SendMail'));
app.use('/api/uploads', require('./routes/upload'));
app.get('/api/config/paypal', (req, res) => {
    res.json(process.env.PAYPAL_CLIENT_ID || 'sb');
});



const PORT = process.env.PORT || 8090;

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));