require('dotenv').config();
const app = require('./app');
const connectDB = require('./src/config/database');

// Conectar a la base de datos (solo una vez por cold start en serverless)
let isConnected = false;
async function ensureDBConnection() {
    if (!isConnected) {
        await connectDB();
        isConnected = true;
    }
}

module.exports = async (req, res) => {
    await ensureDBConnection();
    app(req, res);
};
