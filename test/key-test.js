/*jslint node: true */
/*globals describe, it, before */

var path = require('path');
var fs = require('fs');

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
  
  describe('writeFile', function () {
    it('should succeed to write keyfile', function (done) {
      libKey.generateKey(128, function (err, k) {
        if (err) { return done(err); }
        
        var f = path.join(__dirname, 'tmp.key');
        libKey.writeKeyfile(f, k, function (err) {
          if (err) { return done(err); }
          
          fs.readFile(f, function (err, bytes) {
            if (err) { return done(err); }
            
            var k2 = JSON.parse(bytes);
            expect(JSON.parse(JSON.stringify(k))).to.deep.equal(k2);
            
            done();
          });
        });
      });
    });
  });
});
