const normalizeUser = (userData) => {
  if (!userData.image) {
    userData.image = {};
  }
  userData.image = {
    url:
      userData.image.url ||
      "https://cdn.pixabay.com/photo/2020/04/07/17/01/chicks-5014152_960_720.jpg",
    alt: userData.image.alt || "yellow fluffy chickens",
  };
  if (!userData.portfolio) {
    userData.portfolio = [];
  }
  if (!userData.amount) {
    userData.amount = 1000; // Initial balance in USDT
  }

  if (!userData.name.middleName) {
    userData.name.firstName = userData.name.firstName;
    userData.name.middleName = "";
    userData.name.lastName = userData.name.lastName;
  }
  return {
    ...userData,
    /*     balance: userData.amount || 1000, // Checks if userData.amount exists, otherwise defaults to 1000
    portfolio: userData.portfolio || {}, // Checks if userData.portfolio exists, otherwise defaults to an empty object */
    address: {
      ...userData.address,
      state: userData.address.state || "",
    },
  };
};

module.exports = normalizeUser;
