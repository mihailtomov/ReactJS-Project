const mongoose = require('mongoose');
const { DB_CONNECTION } = require('./server');

mongoose.connect(DB_CONNECTION, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: false 
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log('DB connected!');
});