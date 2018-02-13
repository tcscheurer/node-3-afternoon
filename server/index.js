const express = require('express');
const {json} = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const checkForSession = require('./middlewares/checkForSession');
const swagController = require('./controllers/swag_controller');
const authController = require ('./controllers/auth_controller');
const cartController = require('./controllers/cart_controller');
const searchController = require('./controllers/search_controller');

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(json());
app.use(checkForSession);

app.use(express.static(`${__dirname}/build`));

app.get('/api/swag',swagController.read);
app.post ('/api/login', authController.login);
app.post('/api/register', authController.register);
app.post('/api/signout',authController.signout);
app.get('/api/user', authController.getUser);
app.post('/api/cart',cartController.add);
app.post('/api/cart/checkout',cartController.checkout);
app.delete('/api/cart',cartController.remove);
app.get('/api/search',searchController.search);

app.listen(PORT,()=>console.log(`Express server listening on ${PORT}`))

