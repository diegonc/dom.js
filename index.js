/**
 * Module dependencies
 */

var Document = require('./lib/document'),
    Window = require('./lib/window'),
    Node = require('./lib/node'),
    Tree = require('./lib/tree'),
    parser = require('./lib/parser'),
    Element = require('./lib/element'),
    Text = require('./lib/text'),
    Attribute = require('./lib/attribute'),
    traverse = require('./lib/traverse');

/**
 * Module exports
 */

exports = module.exports = dom;

/**
 * Expose `Window`
 */

exports.Window = Window;

/**
 * Expose `Attribute`
 */

exports.Attribute = Attribute;

/**
 * Expose `Element`
 */

exports.Element = Element;

/**
 * Expose `Text`
 */

exports.Text = Text;

/**
 * Expose `Document`
 */

exports.Document = Document;

/**
 * Expose `Tree`
 */

exports.Tree = Tree;

/**
 * Expose `Node`
 */

exports.Node = Node;

/**
 * Parse an HTML string to a fully compliant DOM.
 *
 * This parses the initial HTML input and returns the
 * appropriate `document` and `window` object.
 *
 * Usage:
 *
 *  var dom = dom('<html><body><div id="hello"></div></body></html>');
 *
 *  @param {String} html
 *  @param {Object} object
 *  @return {Object}
 */

function dom(html, options) {
  if (!options) options = {};
  if (!html) html = '<!DOCTYPE html><html></html>';

  return parser(html, options);
}


Object.defineProperty(Node.prototype, 'innerHTML', {
  set: function(val) {
    var body = dom(val).document.body;
    this.childNodes.length = 0;
    for (var i = 0; i < body.childNodes.length; i++) {
      this.childNodes.push(body.childNodes[i]);
    }
  },
  get: function() {
    // XXX: totally basic impl
    var val = [];
    for (var i = 0, n = this.childNodes.length; i < n; i++) {
      // text node
      if (3 === this.childNodes[i].nodeType)
        val.push(this.childNodes[i].nodeValue);
      else // recurse, there's a better way to do it
        val.push(this.childNodes[i].outerHTML);
    }
    return val.join('');
  }
});
