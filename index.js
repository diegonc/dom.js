/**
 * Module dependencies
 */

var Document = require('./lib/document'),
    Window = require('./lib/window'),
    Node = require('./lib/node'),
    Tree = require('./lib/tree'),
    parser = require('./lib/parser'),
    Element = require('./lib/element'),
    Attribute = require('./lib/attribute');

/**
 * Module exports
 */

exports = module.exports = init;

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
 * Init Function
 *
 * This parses the initial HTML input and returns the
 * appropriate `document` and `window` object.
 *
 * Usage:
 *
 *  var dom = init('<html><body><div id="hello"></div></body></html>', {});
 *
 *  // Document Instance
 *  dom.document
 *
 *  // Window Instance
 *  dom.window
 *
 *  // Find ID
 *  dom.window.getElementByID("hello"); // Returns Node
 */

function init(html, options) {
  if (!options) options = {};
  if (!html) html = '<!DOCTYPE html><html></html>';

  return parser(html, options);
}