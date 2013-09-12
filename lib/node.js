/**
 * Module dependencies
 */

var util = require('./util'),
    Attribute = require('./attribute'),
    Text = require('./text')

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

  this.tagName = this.nodeName = options.nodeName || options.tagName;
  this.nodeValue = options.nodeValue;
  this.nodeType = options.nodeType;
  this.parentNode = null;
  this.childNodes = [];
  this.firstChild = null;
  this.lastChild = null;
  this.previousSibling = options.previousSibling;
  this.nextSibling = options.nextSibling;
  this.attributes = options.attributes;
  this.ownerDocument = options.ownerDocument;
}

/**
 * `outerHTML`
 *
 * This serializes the DOM tree and returns a string.
 */

Object.defineProperty(Node.prototype, "outerHTML", {
  get: function() {
    // XXX: totally basic impl
    var val = ['<' + this.tagName];
    if (this.attributes.length) val.push(serializeAttributes(this));
    val.push('>');
    for (var i = 0, n = this.childNodes.length; i < n; i++) {
      // text node
      if (3 === this.childNodes[i].nodeType)
        val.push(this.childNodes[i].nodeValue);
      else // recurse, there's a better way to do it
        val.push(this.childNodes[i].outerHTML);
    }
    val.push('</' + this.tagName + '>');
    return val.join('');
  }
});

Object.defineProperty(Node.prototype, 'textContent', {
  get: function() {
    var val = [];
    // XXX: iterate
    for (var i = 0, n = this.childNodes.length; i < n; i++) {
      // text node
      if (3 === this.childNodes[i].nodeType)
        val.push(this.childNodes[i].nodeValue);
      else // recurse, there's a better way to do it
        val.push(this.childNodes[i].textContent);
    }
    return val.join('');
  },
  set: function(val) {
    if ('number' === typeof val) val = '' + val;
    // XXX: remove all child nodes
    this.childNodes = [];
    if ('string' === typeof val) {
      var node = new Text(val);
      node.parentNode = this;
      this.childNodes.push(node);
      return node;
    }
  }
});

/**
 * `getAttribute`.
 */

Node.prototype.getAttribute = function(name) {
  return this.attributes[name] && this.attributes[name].value;
};

/**
 * `setAttribute`.
 */

Node.prototype.setAttribute = function(name, val) {
  if (!this.attributes[name]) {
    var attribute = new Attribute();
    attribute.name = name;
    attribute.value = val;
    this.attributes.push(attribute);
    this.attributes[name] = attribute;
  }
  this.attributes[name].value = val;
};

/**
 * `insertBefore`
 */

Node.prototype.insertBefore = function(newChild, refChild) {
  var i = this.childNodes.indexOf(refChild);
  if (i != -1) {
    newChild.parentNode = this;
    this.childNodes.splice(i, 0, newChild);
  }
};

/**
 * `replaceChild`
 */

Node.prototype.replaceChild = function(newChild, oldChild) {
  var i = this.childNodes.indexOf(oldChild);
  if (i != -1) {
    oldChild.parentNode = undefined;
    newChild.parentNode = this;
    this.childNodes.splice(i, 1, newChild);
  }
};

/**
 * `removeChild`
 */

Node.prototype.removeChild = function(oldChild) {
  var i = this.childNodes.indexOf(oldChild);
  if (i != -1) {
    oldChild.parentNode = undefined;
    this.childNodes.splice(i, 1);
  }
  return oldChild;
};

/**
 * `appendChild`
 */

Node.prototype.appendChild = function(newChild) {
  // XXX: not sure the
  var i = this.childNodes.indexOf(newChild);
  if (i != -1) this.childNodes.splice(i, 1);
  newChild.parentNode = this;
  this.childNodes.push(newChild);
  return newChild;
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
  var clone = new this.constructor({
    nodeName: this.nodeName,
    nodeValue: this.nodeValue,
    nodeType: this.nodeType
  });

  if (deep && this.childNodes.length) {
    var childClone;
    for (var i = 0, n = this.childNodes.length; i < n; i++) {
      childClone = this.childNodes[i].cloneNode(true);
      childClone.parentNode = clone;
      clone.childNodes.push(childClone);
    }
  }

  return clone;
};

function serializeAttributes(node) {
  var val = [];
  for (var i = 0, n = node.attributes.length; i < n; i++) {
    val.push(' ' + node.attributes[i].name + '="' + node.attributes[i].value + '"');
  }
  return val.join('');
}
