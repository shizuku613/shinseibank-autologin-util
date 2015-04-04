'use strict';

/*jslint node: true */
/*globals describe, it, before */

var chai = require('chai');
var expect = chai.expect;

var libKey = require('../lib/key');
var crypto = require('../lib/crypto');

describe('Test for lib/crypto.js', function () {
  var key;

  before(function (done) {
    libKey.generateKey(128, function (err, k) {
      key = k;
      done(err);
    });
  });

  describe('encrypt', function () {
    it('should not throw errors', function () {
      var data = { foo: 1 };
      
      expect(function () { crypto.encrypt(data, key); }).to.not.throws();
    });
  });
  
  describe('decrypt', function () {
    it('should succeed to decrypt', function () {
      var data = { foo: 1 };
      var encrypted = crypto.encrypt(data, key);
      
      expect(crypto.decrypt(encrypted, key)).to.deep.equal(data);
    });
  });
});
