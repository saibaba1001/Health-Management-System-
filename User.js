const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  // Add more fields for user data (e.g., mental health status, bio, etc.)
});

module.exports = mongoose.model('User', userSchema);
