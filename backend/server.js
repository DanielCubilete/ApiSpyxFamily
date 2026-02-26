
const mongoose = require('mongoose');
const app = require('./app');
const URI = process.env.MONGODB_URI || 'mongodb+srv://admin:vgZILaxgmRpOwzt9@cluster0.ye1az4p.mongodb.net/Spyxfamily?appName=Cluster0';
mongoose.connect(URI)
    .then(() => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = app;
