const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_CONNECTION);
    const url = `${connection.host} : ${connection.port}`;
    console.log(`MongoDB connected in ${connection}`);
    //console.log(`Connection name ${connection}`);
  } catch (error) {
    console.error(`Error MongoDB: ${error.message}`);
  }
};

module.exports = connectDB;
