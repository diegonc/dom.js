

/**
 * Expose `Text`.
 */

module.exports = Text;

/**
 * Text node.
 */

function Text(val) {
  this.nodeValue = val;
  this.nodeName = '#text';
  this.nodeType = 3;
}


Text.prototype.toString = function(){
  return this.nodeValue;
}
