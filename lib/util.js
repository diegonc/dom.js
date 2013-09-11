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
    html += "<!DOCTYPE " + node.doctype + ">"
  }


  function DLS(node) {

  }

}

