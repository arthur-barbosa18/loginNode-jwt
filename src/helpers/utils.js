const bcrypt = require("bcrypt");
require('dotenv').load();

exports.hashPassword = (password) => {
  return bcrypt.hashSync(password, process.env.SALT_ROUNDS);
};
