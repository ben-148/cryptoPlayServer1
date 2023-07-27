const config = require("config");
const mongoose = require("mongoose");

console.log("DataBase", config.get("dbConfig.url"));

const connectToDB = () => {
  return mongoose.connect(config.get("dbConfig.url"));
};

module.exports = connectToDB;
