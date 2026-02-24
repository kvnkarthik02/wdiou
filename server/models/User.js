const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  verified: {type:String, unique:true, required:true},
  verificationToken: String,
  verificationValid:Date
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);