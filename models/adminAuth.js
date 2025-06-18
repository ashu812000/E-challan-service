const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // should be hashed in real-world
});

module.exports = mongoose.model('Admin', userSchema);
