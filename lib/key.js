'use strict';

/*jslint node: true */

var crypto = require('crypto');
var fs = require('fs');

exports.generateKey = function (size, cb) {
  crypto.randomBytes(size, function (err, bytes) {
    if (err) { return cb(err); }
    
    var key = {
      version: 1,
      size: size,
      key: bytes,
      created: new Date()
    };
    
    cb(null, key);
  });
};

exports.writeKeyfile = function (filename, key, cb) {
  if (!key) { return cb('Invalid argument `key`'); }
  fs.writeFile(filename, JSON.stringify(key), cb);
};