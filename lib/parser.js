/**
 * Module dependencies
 */

var gumbo = require('gumbo-parser'),
    Document = require('./document'),
    Window = require('./window'),
    Tree = require('./tree'),
    Node = require('./node'),
    Element = require('./element');

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
  var document = exports.convert(parsedTree);

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
 *
 * We need to take the initial gumbo parse tree and turn
 * it into a proper DOM tree. This is just a simple traversal.
 */

exports.convert = function(tree) {
  var queue = [];
  var root = tree.root;
  queue.push(root);

  // Create a new document.
  var document = new Document({
    doctype: tree.document.name || 'html'
  });

  document.nodeType = tree.document.nodeType;
  document.nodeName = tree.document.nodeName;

  while(queue.length > 0) {
    var node = queue.pop();

    var nodeInstance;
    switch(node.nodeType) {
      case 1: // ELEMENT
        nodeInstance = new Element();
      break;
      case 8; // COMMENT

      break;
      case 9; // DOCUMENT

      break;
      case 11: // DOCUMENT FRAGMENT

      break;
      default:
        throw new Error("Unknown or Unimplemented nodeType.");
      break;
    }

    if (!nodeInstance) {
      throw new Error("Empty nodeInstance. Implementation missing.");
    }

    nodeInstance.tagName = node.tagName;
    nodeInstance.nodeName = node.nodeName;
    nodeInstance.nodeType = node.nodeType;
    nodeInstance.attributes = node.attributes;
  }

  return document;
};