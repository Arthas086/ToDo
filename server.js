const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('./mongoose');
const authentication = require('./authentication');

const app = express();

app.use(bodyParser.json());
app.post('/register', (req, res) => {
    mongoose.register(req.body.username, req.body.password).then((content) => {
        res.header('x-auth', content.token).send(content.obj);
    }).catch((err) => {
        res.status(404).send(err);
    });
});
app.post('/login', (req, res) => {
    mongoose.login(req.body.username, req.body.password).then((content) => {
        res.header('x-auth', content.token).send(content.obj)
    }).catch((err) => {
        res.status(404).send(err);
    });
});
app.post('/add', authentication.authentication, (req, res) => {
    mongoose.add(req.user.username, req.body.text).then((todo) => {
        res.send(todo);
    }).catch((err) => {
        res.status(404).send(err);
    });
});
app.get('/get', authentication.authentication, (req, res) => {
    mongoose.get(req.user.username).then((todos) => {
        res.send(todos)
    }).catch(err => res.status(404).send(err))
});
app.post('/update', authentication.authentication, (req, res) => {
    mongoose.update(req.user.username, req.body.text, req.body.completed);
});
app.delete('/remove', (req, res) => {
    mongoose.remove(req.query.username).then((raw) => {
        res.send(raw);
    }).catch(err => res.status(404).send(err.toString()))
});
app.listen(3000, () => {
    console.log('we\'re on the port 3000');
});

