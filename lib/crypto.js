'use strict';

/*jslint node: true */

var crypto = require('crypto');

function createAlgorithm(size) {
  return 'AES-' + size + '-CBC';
}

exports.encrypt = function (data, key){
  var text = JSON.stringify(data);
  var cipher = crypto.createCipher(createAlgorithm(key.size), key.key);
  var crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return { encrypted: crypted };
};

exports.decrypt = function (encrypted, key){
  var decipher = crypto.createDecipher(createAlgorithm(key.size), key.key);
  var dec = decipher.update(encrypted.encrypted, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return JSON.parse(dec);
};
