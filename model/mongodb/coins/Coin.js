const mongoose = require("mongoose");
const Image = require("./Image");
const Address = require("./Address");
const {
  URL,
  DEFAULT_STRING_SCHEMA_REQUIRED,
} = require("./helpers/mongooseValidation");

const coinSchema = new mongoose.Schema({
  name: DEFAULT_STRING_SCHEMA_REQUIRED,
  codeName: DEFAULT_STRING_SCHEMA_REQUIRED,
  price: {
    type: String,
    required: true,
  },
  image: Image,
});

const Coin = mongoose.model("coins", coinSchema);

module.exports = Coin;
