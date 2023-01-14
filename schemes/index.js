const mongoose = require('mongoose');

const connect = () => {
    // if (process.env.NODE_ENV != 'production') {
    // mongoose.set('debug', true)
    // }
    mongoose.set('strictQuery', true)
    mongoose.connect('mongodb://' + process.env.MONGO_USER + ':' + process.env.MONGO_PW + '@127.0.0.1:27017/admin', {
        dbName: 'stardue128',
        useNewUrlParser: true,
    }, (err) => {
        if (err) {
            console.error(err);
            console.error('failed to connect to mongodb');
        } else {
            console.log('successfully connected to mongodb');
        }
    })
}
mongoose.connection.on('error', (err) => {
    console.log('mongodb connection error', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('disconnected to mongodb. retry to connect.');
    connect();
});

module.exports = connect;
