const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
    perfil_user_id: { type: Number, required: true},
    token: { type: String },
    created_at: Date,
    updated_at: Date,
    deleted_at: Date,
    deletion_logic: { type: Boolean, default: false}
});

UserSchema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('User', UserSchema);