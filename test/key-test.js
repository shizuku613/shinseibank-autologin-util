/*jslint node: true */
/*globals describe, it */

var chai = require('chai');
var expect = chai.expect;

var libKey = require('../lib/key');

describe('Test for lib/key.js', function () {
  describe('generateKey', function () {
    var key;
    
    before(function (done) {
      libKey.generateKey(128, function (err, k) {
        key = k;
        done(err);
      });
    });
    
    it('should have property `version`', function () {
      expect(key).to.have.property('version').that.is.equal(1);
    });
    
    it('should have property `size`', function () {
      expect(key).to.have.property('size').that.is.equal(128);
    });
    
    it('should have property `key`', function () {
      expect(key).to.have.property('key');
      expect(key.key).to.have.length(128);
    });
    
    it('should have property `created`', function () {
      expect(key).to.have.property('created').that.is.an.instanceof(Date);
      expect(new Date() - key.created).to.be.below(500);
    });
  });
});
