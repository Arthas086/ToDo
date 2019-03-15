const mongoose = require('mongoose');
const sha256 = require('sha256');
let users = [];
mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}).catch(err => console.log(err.toString()));
var user = mongoose.model('user', {
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
var todo = mongoose.model('todo', {
    username: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});
exports.register = (username, password) => {
    return new Promise(((resolve, reject) => {
        (new user({
            username: username,
            password: sha256(password)
        })).save().then((raw) => {
            resolve(raw)
        }).catch((err) => reject(err))
    }))
};
exports.login = (user, pass) => {

};
exports.logout = () => {

};
exports.add = (username, text) => {
    return new Promise((resolve, reject) => {
        (new todo({
            username: username,
            text: text
        })).save().then((raw) => {
            resolve(raw);
        }).catch((err) => reject(err))
    })
};
exports.get = (username) => {
    return new Promise((resolve, reject) => {
        if (username !== undefined) {
            todo.find({
                username: username
            }).then((todos) => {
                resolve(todos);
            }).catch(err => reject(err));
        } else {
            todo.find().then((todos) => {
                resolve(todos);
            }).catch(err => reject(err));
        }
    })
};
exports.update = (text, completed) => {

};
exports.remove = (id) => {

};
