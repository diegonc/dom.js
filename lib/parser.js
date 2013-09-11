/**
 * Module dependencies
 */

var gumbo = require('gumbo-parser'),
  Document = require('./document'),
  Window = require('./window'),
  Tree = require('./tree'),
  Node = require('./node'),
  Element = require('./element'),
  Attribute = require('./attribute');

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

  // Create a new document.
  var document = new Document({
    doctype: tree.document.name || 'html'
  });

  document.nodeType = tree.document.nodeType;
  document.nodeName = tree.document.nodeName;

  queue.push({
    node: root,
    parent: document
  });

  while (queue.length > 0) {
    var node = queue.pop();
    var original = node;
    var parent = null;

    if (node.node) {
      parent = node.parent;
      node = node.node;
    }

    var nodeInstance;
    switch (node.nodeType) {
      case 1: // ELEMENT
        nodeInstance = new Element();
        nodeInstance.tagName = node.tagName;
        nodeInstance.nodeName = node.nodeName;
        nodeInstance.nodeType = node.nodeType;
        //nodeInstance.attributes = node.attributes;
        if ('body' === node.tagName) {
          document.body = nodeInstance;
        }

        if (parent) {
          nodeInstance.parentNode = parent;
          parent.childNodes.push(nodeInstance);
        }

        var attrs = node.attributes;
        for (var i = 0; i < attrs.length; i++) {
          var val = attrs[i];
          var attribute = new Attribute();
          attribute.name = val.name;
          attribute.value = val.value;
          nodeInstance.attributes.push(attribute);
        }

        break;
      case 8: // COMMENT

        break;
      case 9: // DOCUMENT

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

    // Look for childNodes
    for (var i = 0, n = node.childNodes.length; i < n; i++) {
      queue.push({
        node: node.childNodes[i],
        parent: nodeInstance
      });
    }

  }

  return document;
};