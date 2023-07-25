const normalizeUserFromGoogle = ({
  email,
  given_name,
  family_name,
  picture,
}) => {
  return {
    name: {
      firstName: given_name,
      lastName: family_name,
    },
    email: email,
    image: {
      url: picture,
      alt: "profile image from google",
    },
    password: "AaBbCc9!",
    phone: "050-0000000",
    address: {
      country: "defualt",
      city: "address",
      street: "for google user",
      houseNumber: 156,
      zip: "",
    },
  };
};

module.exports = normalizeUserFromGoogle;
