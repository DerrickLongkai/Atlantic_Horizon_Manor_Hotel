const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const staffSchema = new mongoose.Schema({
  staff_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['boss', 'manager', 'staff'], 
    default: 'boss',
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Suspended'], 
    default: 'Active',
  }
}, {
  timestamps: true 
});

// 密码验证方法
staffSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Staff = mongoose.model('Staff', staffSchema);
module.exports = Staff;