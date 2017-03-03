var mongoose     = require('mongoose');

var BearSchema   = new mongoose.Schema({
    name: String,
    createdAt: { type: Date, default: Date.now }
});
/*
BearSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});
*/
module.exports = mongoose.model('Bear', BearSchema);
