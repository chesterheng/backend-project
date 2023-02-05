const jwt = require("jsonwebtoken");

const createToken = (user) => {
  const { email } = user;
  return jwt.sign(
    {
      email,
    },
    "JWT_SECRET",
    { algorithm: "HS256", expiresIn: "1h" }
  );
};

module.exports = { createToken };
