/**
 * Module dependencies.
 */

/**
 * Module Exports
 */

exports = module.exports = {};

/**
 * Serialize a given node.
 */

exports.serialize = function(node, outer) {
  if (!outer) outer = false;

  var html = '';

  // Implement doctype if it's a DOCUMENT_NODE
  if (node.nodeType === 9) {
    html += "<!DOCTYPE " + node.doctype + ">\n";
  }

  var discovered = [];
  var explored = [];

  function DFS(tree, n) {
    discovered.push(n);

    for (var i = 0; i < n.parentNode.childNodes.length; i++) {
      var w = n.parentNode.childNodes[i];
      if ()
    }
  }

  return html;
}