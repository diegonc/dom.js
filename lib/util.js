
/**
 * Serialize a given node.
 */

exports.serialize = function(node, outer){
  if (!outer) outer = false;

  var html = '';

  // Implement doctype if it's a DOCUMENT_NODE
  if (node.nodeType === 9) {
    html += "<!DOCTYPE " + node.doctype + ">\n";
  }

  var explored = [];
  var discovered = [];

  function serializeAttributes(attrs) {
    if (!attrs) return '';
    var str = '';
    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];
      str += " " + attr.name + "=\"" + attr.value + "\"";
    }
    return str;
  }

  function visit(n) {
    discovered.push(n);
    html += "<" + n.tagName + serializeAttributes(n.attributes) + ">\n";
    for (var i = 0; i < n.childNodes.length; i++) {
      var e = n.childNodes[i];
      if (explored.indexOf(e) === -1) {
        visit(e);
      }
    }

    html += "</" + n.tagName + ">\n";
    explored.push(n);
  }

  function dfs(n, t) {
    if (t) html += "<" + n.tagName + serializeAttributes(n.attributes) + ">\n";
    visit(n);
    if (t) html += "</" + n.tagName + ">\n";
  }

  if (node.nodeType === 9) {
    // Fetch the HTML node
    dfs(node.childNodes[0]);
  }

  if (node.nodeType === 1) {
    if (outer)
      dfs(node, true);
    else
      dfs(node, false);
  }

  return html;
};