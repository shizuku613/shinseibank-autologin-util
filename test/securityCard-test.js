/*jslint node: true */
/*globals describe, it */

var chai = require('chai');
var expect = chai.expect;

var securityCard = require('../lib/securityCard');

describe('Test for lib/securityCard.js', function () {
  describe('convert', function () {
    it('should convert from array to hash', function () {
      var from = [
        [ 'A', '0', 'G' ],
        [ 'K', 'L', '5' ]
      ];
      
      var to = {
        A0: 'A', B0: '0', C0: 'G',
        A1: 'K', B1: 'L', C1: '5'
      };
      
      expect(securityCard.convert(from)).to.deep.equal(to);
    });
  });
});
