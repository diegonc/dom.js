/**
 * Module dependencies.
 */

var util = require('util'),
    Node = require('./node');

/**
 * Module exports
 */

exports = module.exports = CharacterData;

/**
 * Element constructor
 */

function CharacterData(data, length) {
  Node.call(this, {});
  this.data = data || null;
  this.length = length || 0;
}

/**
 * Inherits
 */

util.inherits(CharacterData, Node);
