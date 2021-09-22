const mongoose = require('mongoose');
require('dotenv').config();

const ConnectDB = async () => {
    await mongoose.connect(process.env.DB_URL);
    let db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function callback() {
        console.log('Connection with database succeeded.');
    });
}

exports.ConnectDB = ConnectDB;