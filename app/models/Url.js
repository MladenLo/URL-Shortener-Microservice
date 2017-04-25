var mongoose = require('mongoose');
mongoose.connect('mongodb://iamawesome:picajzla1@ds145009.mlab.com:45009/mladenlodb');
var Schema = mongoose.Schema;

var URL = new Schema({
  unique_number: {type: Number, unique: true},
  url: { type: String, required: true },
  short_url: { type: String, required: true },
});

module.exports = mongoose.model('Url', URL);

