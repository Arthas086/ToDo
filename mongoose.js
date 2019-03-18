const mongoose = require('mongoose');
const sha256 = require('sha256');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const secretKey = 'hello world';

mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}).catch(err => console.log(err.toString()));
var user = mongoose.model('user', {
    username: {
        type: String,
        required: true,
        unique: true
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
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number
    }
});
exports.register = (username, password) => {
    return new Promise((resolve, reject) => {
        (new user({
            username: username,
            password: sha256(password)
        })).save().then((user) => {
            var obj = _.pick(user, ['_id', 'username']);
            resolve({
                obj,
                token: jwt.sign(obj, secretKey)
            })
        }).catch((err) => reject(err))
    })
};
exports.login = (username, password) => {
    return new Promise((resolve, reject) => {
        user.findOne({
            username: username,
            password: sha256(password)
        }).then((user) => {
            if (!user) {
                reject();
            } else {
                var obj = _.pick(user, ['_id', 'username']);
                resolve({
                    obj,
                    token: jwt.sign(obj, secretKey)
                })
            }
        }).catch((err) => reject(err))
    })
};
exports.add = (username, text) => {
    return new Promise((resolve, reject) => {
        (new todo({
            username: username,
            text: text,
            completed: false
        })).save().then((todo) => {
            resolve(todo);
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
exports.remove = (username) => {
    return new Promise((resolve, reject) => {
        todo.deleteMany({username: username}).then((result) => {
            resolve(result)
        }).catch(err => reject(err))
    })
};
Object.assign(exports, exports, {user, todo});
