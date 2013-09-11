/**
 * Module dependencies.
 */

var util = require('util'),
    Node = require('./node');

/**
 * Module exports
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