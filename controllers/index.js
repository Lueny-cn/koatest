const User = require('./userCtrl');

module.exports = {
  get $User () {
    return User;
  },
};