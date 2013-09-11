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

  var queue = [];
  queue.push(node.childNodes[0]);

  while(queue.length > 0) {
    var n = queue.pop();

    console.log(n.tagName);

    html += "<" + n.tagName;

    for (var k = 0; k < n.attributes.length; k++) {
      var attr = n.attributes[k];
      html += " " + attr.name + "=\"" + attr.value + "\"";
    }

    html += ">\n";

    for (var i = 0; i < n.childNodes.length; i++) {
      queue.push(n.childNodes[i]);
    }

  }

  return html;
}

