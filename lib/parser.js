/**
 * Module dependencies
 */

var gumbo = require('gumbo-parser'),
    Document = require('./document'),
    Window = require('./window'),
    Tree = require('./tree'),
    Node = require('./node');

/**
 * Module exports
 */

exports = module.exports = parser;

/**
 * Parser Function
 */

function parser(html, options) {

  // Parse the initial HTML
  var parsedTree = gumbo(html);

  // Convert the gumbo parse tree to our own.
  var tree = exports.convert(parsedTree);

  // Create a new Document instance.
  var document = new Document(tree);

  // Create a new Window instance.
  var window = new Window(document);

  // Return the result.
  return {
    document: document,
    window: window
  };
}


/**
 * Convert the parser tree
 */

exports.convert = function(tree) {
  return new Tree();
};