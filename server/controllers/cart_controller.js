const swag = require('../models/swag');

module.exports = {
    add: (req,res,next) => {
        const {id} = req.query;
        const {cart} = req.session.user;
        const index = cart.findIndex(swag => swag.id == id);
        if(index === -1){
            const item = swag.find( item => item.id == id);
            cart.push(item);
            req.session.user.total += item.price;
        }
               
        res.status(200).send(req.session.user);
    },

    remove: (req,res,next) => {
        const {id} = req.query;
        const {cart} = req.session.user;
        const mySwag = cart.find(swag => swag.id == id);
        if(mySwag){
        const index = cart.findIndex(item => item.id == id);
        cart.splice(index,1);
        req.session.user.total -= mySwag.price;
        }
        res.status(200).send(req.session.user)
    },

    checkout: (req,res,next)=> {
        req.session.user.cart = [];
        req.session.user.total = 0;
        res.status(200).send(req.session.user);
    }
}