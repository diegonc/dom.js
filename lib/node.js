/**
 * Module exports.
 */

exports = module.exports = Node;

/**
 * Node constructor
 */

function Node(options) {
  if (!options) options = {};
  this.ELEMENT_NODE = 1;
  this.ATTRIBUTE_NODE = 2;
  this.TEXT_NODE = 3;
  this.CDATA_SECTION_NODE = 4;
  this.ENTITY_REFERENCE_NODE = 5;
  this.ENTITY_NODE = 6;
  this.PROCESSING_INSTRUCTION_NODE = 7;
  this.COMMENT_NODE = 8;
  this.DOCUMENT_NODE = 9;
  this.DOCUMENT_TYPE_NODE = 10;
  this.DOCUMENT_FRAGMENT_NODE = 11;
  this.NOTATION_NODE = 12;

  this.nodeName = options.nodeName;
  this.tagName = options.tagName;
  this.nodeValue = options.nodeValue;
  this.nodeType = options.nodeType;
  this.parentNode = options.parentNode;
  this.childNodes = options.childNodes;
  this.firstChild = options.firstChild;
  this.lastChild = options.lastChild;
  this.previousSibling = options.previousSibling;
  this.nextSibling = options.nextSibling;
  this.attributes = options.attributes;
  this.ownerDocument = options.ownerDocument;
}

/**
 * `insertBefore`
 */

Node.prototype.insertBefore = function(newChild, refChild) {

};

/**
 * `replaceChild`
 */

Node.prototype.replaceChild = function(newChild, oldChild) {

};

/**
 * `removeChild`
 */

Node.prototype.removeChild = function(oldChild) {

};

/**
 * `appendChild`
 */

Node.prototype.appendChild = function(newChild) {

};

/**
 * `hasChildNodes`
 */

Node.prototype.hasChildNodes = function() {

};

/**
 * `cloneNode`
 */

Node.prototype.cloneNode = function(deep) {

};