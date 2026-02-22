const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['patient', 'doctor'], default: 'patient' },
  
  // Patient onboarding bio data
  bioData: {
    age: Number,
    gender: String,
    primaryCondition: String,
    conditionDuration: String,
    disabilities: [String],
    mobilityLevel: Number,       // 1-10
    painLevel: Number,           // 1-10
    sleepQuality: String,        // 'poor' | 'fair' | 'good'
    currentMedications: [String],
    goals: [String],
    emergencyContactName: String,
    emergencyContactPhone: String,
  },
  onboardingComplete: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Don't return passwordHash in JSON responses
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.passwordHash;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
