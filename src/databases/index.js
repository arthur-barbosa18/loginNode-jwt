require('dotenv').load();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || process.env.connectionString,  { useNewUrlParser: true, useCreateIndex: true });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/users/user.model'),
    Profile: require('../models/profiles/profile.model')
};