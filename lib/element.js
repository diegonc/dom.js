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

function Element() {
  this.tagName = null;

}

/**
 * Inherits
 */

util.inherits(Element, Node);