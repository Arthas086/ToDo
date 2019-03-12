const {MongoClient} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/Todo')
    .then((client) => {
        const db = client.db('TodoApp');
        db.collection('user').insertOne({
            name: 'mani khademli',
            age: 10
        }).then(res => {
            console.log(res.ops[0]._id, undefined, 2);
        }).catch(err => console.log(err.toString()));
        client.close().catch(err => console.log(err.toString()));
    }).catch(err => console.log(err.toString()));
