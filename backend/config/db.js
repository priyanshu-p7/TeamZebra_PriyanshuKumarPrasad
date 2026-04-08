const mongoose = require('mongoose');

const connectDB = async () => {
  const maxRetries = 5;
  let retries = 0;

  const tryConnect = async () => {
    while (retries < maxRetries) {
      try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
          serverSelectionTimeoutMS: 10000,
          socketTimeoutMS: 45000,
          family: 4,
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        return true;
      } catch (error) {
        retries++;
        console.error(`❌ MongoDB attempt ${retries}/${maxRetries}: ${error.message}`);
        if (retries < maxRetries) {
          console.log(`   Retrying in 5 seconds...`);
          await new Promise((r) => setTimeout(r, 5000));
        }
      }
    }
    console.error('⚠️  MongoDB not connected. Server is running but DB features will fail.');
    console.error('   Fix: whitelist your IP at cloud.mongodb.com or switch to mobile hotspot.');
    return false;
  };

  // Don't block server startup — connect in background
  tryConnect();
};

module.exports = connectDB;
