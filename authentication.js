const jwt = require('jsonwebtoken');
const secretKey = 'hello world';
const mongoose = require('./mongoose');

module.exports.authentication = (req, res, next) => {
    const token = req.header('x-auth');
    let id;
    try {
        id = jwt.verify(token, secretKey)._id;
    } catch (e) {
        return res.status(404).send()
    }
    mongoose.user.findOne({_id: id}).then(user => {
        req.user = user;
        next();
    })
};
