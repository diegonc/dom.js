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

function Element(name) {
  Node.call(this);
  this.tagName = name;
  this.attributes = [];
}

/**
 * Inherits
 */

util.inherits(Element, Node);