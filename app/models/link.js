var db = require('mongoose');
var crypto = require('crypto');

var urlSchema = db.Schema({
  link: String,
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number
});

var Link = db.model('Link', urlSchema);

var createSha = function(url) {
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
};

urlSchema.pre('save', function(next) {
  var code = createSha(this.url);
  this.code = code;
  next();
});

module.exports = Link;
