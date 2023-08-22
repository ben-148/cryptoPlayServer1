const generateBizNumber = require("./generateBizNumber");

const normalizeCoin = async (coin, userId) => {
  if (!coin.image) {
    coin.image = {};
  }
  coin.image = {
    url:
      coin.image.url ||
      "https://cdn.pixabay.com/photo/2020/04/07/17/01/chicks-5014152_960_720.jpg",
    alt: coin.image.alt || "yellow fluffy chickens",
  };
  return {
    ...coin,
    address: {
      ...coin.address,
      state: coin.address.state || "",
    },
    bizNumber: coin.bizNumber || (await generateBizNumber()),
    user_id: coin.user_id || userId,
  };
};

module.exports = normalizeCoin;