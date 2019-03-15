const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('./mongoose');
const app = express();

app.use(bodyParser.json());
app.post('/register', (req, res) => {
    console.log(req.body);
    mongoose.register(req.body.username, req.body.password).then((raw) => {
        res.send(raw);
    }).catch((err) => {
        res.send(err);
    });
    // mongodb.login(req.user, req.password);
});
app.post('/login', (req, res) => {
    mongoose.login(req.user, req.password);
});
app.post('/logout', (req, res) => {
    mongoose.logout();
});
app.post('/add', (req, res) => {
    mongoose.add(req.body.username, req.body.text).then((raw) => {
        res.send(raw);
    }).catch((err) => {
        res.send(err);
    });
});
app.get('/get', (req, res) => {
    mongoose.get(req.query.username).then((todos) => {
        res.send(todos)
    }).catch(err => res.send(err))
});
app.post('/update', (req, res) => {
    mongoose.update(req.text, req.completed);
});
app.get('/remove', (req, res) => {
    mongoose.remove(req.id)
});
app.listen(3000, () => {
    console.log('we\'re on the port 3000');
});

