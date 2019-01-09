const bcrypt = require("bcrypt");
const config = require('./../config/database.js');

exports.hashPassword = (password) => {
  return bcrypt.hashSync(password, config.salt_rounds);
};
