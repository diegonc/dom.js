
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

  /**
   * `children`.
   *
   * Only returns Elements, not Text/Comment nodes.
   */

  Object.defineProperty(this, 'children', {
    get: function(){
      var children = [];
      if (this.childNodes) {
        for (var i = 0; i < this.childNodes.length; i++) {
          switch (this.childNodes[i].nodeType) {
            case 9:
            case 1:
              children.push(this.childNodes[i]);
              break;
          }
        }
      }
      return children;
    },
    enumerable: true
  });
}

/**
 * Inherits
 */

util.inherits(Element, Node);
