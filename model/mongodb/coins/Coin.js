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
  description: DEFAULT_STRING_SCHEMA_REQUIRED,
  price: {
    type: Number,
    required: true,
  },
  likes: [String],
  image: Image,
  change24: {
    type: Number,
  },
  market_cap: {
    type: Number,
  },
});

const Coin = mongoose.model("coins", coinSchema);

module.exports = Coin;
