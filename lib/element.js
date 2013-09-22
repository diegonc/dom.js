
/**
 * Module dependencies.
 */

var util = require('util');
var Node = require('./node');

/**
 * Expose `Element`.
 */

exports = module.exports = Element;

/**
 * Element constructor
 */

function Element(options) {
  Node.call(this, options);
  this.attributes = [];
}

/**
 * Inherits
 */

util.inherits(Element, Node);
