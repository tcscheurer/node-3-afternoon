const users = require('../models/users');
let i = 1;

module.exports = {
    login: (req,res,next)=>{
        const {session} = req;
        const {username,password} = req.body;
        const user = users.find( user => user.username === username && user.password === password);
        if(user){
            session.user.username = user.username;
            res.status(200).send(session.user);
        } else {
            res.status(500).send('Unauthorized');
        }
    },

    register: (req,res,next)=>{
        const {username,password} = req.body;
        users.push({i,username,password});
        i++;
        const {session} = req;
        session.user.username = username;
        res.status(200).send(session.user);
    },

    signout: (req,res,next)=>{
        req.session.destoy();
        res.status(200).send(req.session);
    },

    getUser: (req,res,next)=>{
        const {user} = req.session;
        res.status(200).send(user);
    }
}