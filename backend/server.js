
const mongoose = require('mongoose');
const app = require('./app');
const URI = process.env.MONGODB_URI || 'mongodb+srv://admin:vgZILaxgmRpOwzt9@cluster0.6gr9ofh.mongodb.net/spyxfamily?retryWrites=true&w=majority';
mongoose.connect(URI)
    .then(() => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = app;
