
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

/**
 * `getElementsByTagName`
 *
 * This gets __all__ descendant elements that match the tag name.
 */
Element.prototype.getElementsByTagName = function(tagName){
  var elements = [];
  var queue = [];

  for (var i = 0, n = this.childNodes.length; i < n; i++) {
    queue.push(this.childNodes[i]);
  }

  var node;

  while (queue.length) {
    node = queue.pop();

    if (node.tagName === tagName)
      elements.push(node);

    for (var i = 0, n = node.childNodes.length; i < n; i++) {
      var _node = node.childNodes[i];
      queue.push(_node);
    }
  }

  return elements;
};
