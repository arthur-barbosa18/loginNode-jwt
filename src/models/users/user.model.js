const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
    perfil_user_id: { type: Number, required: true},
    created_at: Date,
    updated_at: Date
});

UserSchema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('User', UserSchema);