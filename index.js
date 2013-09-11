/**
 * Module dependencies
 */

var Document = require('./lib/document'),
    Window = require('./lib/window'),
    parser = require('./lib/parser');

/**
 * Module exports
 */

exports = module.exports = init;

/**
 * Expose `Window`
 */

exports.Window = Window;

/**
 * Expose `Document`
 */

exports.Document = Document;

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
  if (!html) html = '';

  return parser(html, options);
}