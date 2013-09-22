
/**
 * Module dependencies.
 */

var gumbo = require('gumbo-parser');
var Window = require('./window');
var traverse = require('./traverse');

/**
 * Expose `parser`.
 */

exports = module.exports = parser;

/**
 * Parse the inputted html and return a fully compliant mutable DOM.
 *
 * @param {String} html
 * @param {Object} options
 * @return {Object} Object containing both a document instance and
 *                  a window instance.
 */

function parser(html, options) {
  // Parse the initial HTML
  var parsedTree = gumbo(html);

  // Convert the gumbo parse tree to our own.
  var document = traverse(parsedTree);

  // Create a new Window instance.
  var window = new Window(document);

  // Return both the document and window objects.
  // - Right now, the `window` object just as a `document` key so that
  //   external libraries (like jQuery, and the like) work.
  return { document: document, window: window };
}