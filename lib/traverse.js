/**
 * Module dependencies.
 */

var gumbo = require('gumbo-parser'),
  Document = require('./document'),
  Window = require('./window'),
  Tree = require('./tree'),
  Node = require('./node'),
  Element = require('./element'),
  Text = require('./text'),
  Attribute = require('./attribute');

/**
 * Module exports.
 */

exports = module.exports = traverse;

/**
 * Convert the parser tree.
 *
 * The following is a iterative-deepening depth-first search.
 * It replaces the previous breadth-first search that tangled tags.
 *
 * @param {Object} The gumbo DOM tree.
 * @return {Document} return a new document instance.
 */

function traverse(tree) {

  // Create a new document.
  var document = new Document({
    doctype: tree.document.name || 'html'
  });

  // Set the properties for the document.
  document.nodeType = tree.document.nodeType;
  document.nodeName = tree.document.nodeName;

  // Keep track of the nodes that we find and finish (respectively).
  var discovered = [];
  var explored = [];

  /**
   * Perform a depth-first search against the inputted Gumbo DOM tree.
   * This will effectively create our own DOM tree, with our own objects
   * and it being mutable.
   *
   * @param {Object} node A gumbo node object.
   * @param {Element|Text|...} parent A real node (Element/Text/Document/...)
   */

  function traverse(node, parent) {

    // We have found/seen the current node. Make note of it.
    discovered.push(node);

    // Create a new variable for the node instance that we'll fill later.
    var nodeInstance;

    // XXX: Add the rest of the different types of nodes according to the
    //      spec.
    switch (node.nodeType) {
      case 1: // ELEMENT

        // Create a new `Element` instance.
        nodeInstance = new Element();

        // Setup the appropriate properties.
        nodeInstance.tagName = node.tagName;
        nodeInstance.nodeName = node.nodeName;
        nodeInstance.nodeType = node.nodeType;

        // XXX: Setup the `ownerDocument` property

        if ('body' === node.tagName) {
          document.body = nodeInstance;
        }

        // Gather all the attributes and create them.
        var attrs = node.attributes;
        for (var i = 0; i < attrs.length; i++) {
          var val = attrs[i];
          var attribute = new Attribute();
          attribute.name = val.name;
          attribute.value = val.value;
          nodeInstance.attributes.push(attribute);
          // for quick access
          nodeInstance.attributes[attribute.name] = attribute;
        }

        break;
      case 3: // TEXT
        nodeInstance = new Text(node.textContent);
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

    // Make sure we have returned a valid node.
    // XXX: put `instanceof Node` checks considering they all
    //      inherit from that object anyways.
    if (!nodeInstance) {
      throw new Error("Empty nodeInstance. Implementation missing.");
    }

    nodeInstance.parentNode = parent;
    parent.childNodes.push(nodeInstance);

    if (node.childNodes) {
      for (var i = 0; i < node.childNodes.length; i++) {

        var e = node.childNodes[i];

        if (explored.indexOf(e) === -1) {
          traverse(e, nodeInstance);
        }

      }
    }

    // We are done exploring the current node (including children)
    explored.push(node);
  }

  // Traverse the tree.
  traverse(tree.root, document);

  // Return our new document instance.
  return document;
};
