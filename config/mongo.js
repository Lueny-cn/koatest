var mongoose = require('mongoose');
var config = require('./config.js');
mongoose.Promise = global.Promise;

module.exports = function() {
  var db = mongoose.connect(config.mongodb);
  return db;
}