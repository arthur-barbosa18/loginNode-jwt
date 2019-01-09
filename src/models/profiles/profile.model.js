const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    profilename: { type: String, required: true, unique: true },
    created_at: Date,
    updated_at: Date
});

ProfileSchema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('Profile', ProfileSchema);