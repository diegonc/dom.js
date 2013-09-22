
/**
 * Module dependencies.
 */

var Document = require('./lib/document');
var Window = require('./lib/window');
var Node = require('./lib/node');
var Tree = require('./lib/tree');
var parser = require('./lib/parser');
var Element = require('./lib/element');
var Text = require('./lib/text');
var Attribute = require('./lib/attribute');
var traverse = require('./lib/traverse');

/**
 * Expose `dom`.
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