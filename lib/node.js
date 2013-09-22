
/**
 * Module dependencies.
 */

var util = require('./util');
var Attribute = require('./attribute');
var Text = require('./text');

/**
 * Expose `Node`.
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
 * Serializes the DOM tree and returns a string.
 */

Object.defineProperty(Node.prototype, "outerHTML", {
  get: function(){
    var discovered = [];
    var explored = [];

    var str = '';

    function serializeAttributes(node) {
      var attrs = '';
      if (node.attributes) {
        for (var i = 0; i < node.attributes.length; i++) {
          var attr = node.attributes[i];
          attrs += ' ' + attr.name + '="' + attr.value + '"';
        }
      }
      return attrs;
    }

    function visit(node) {
      discovered.push(node);

      switch (node.nodeType) {
        case 1:
          str += '<' + node.tagName + serializeAttributes(node) + '>\n\t';
          break;
        case 8:
          str += '<!-- ' + node.data + ' -->';
          break;
        case 3:
          str += node.nodeValue;
          break;
        case 9:
          str += '<!DOCTYPE ' + (node.doctype || 'html') + '>\n';
          break;
      }

      if (node.childNodes) {
        for (var i = 0; i < node.childNodes.length; i++) {
          var e = node.childNodes[i];
          if (explored.indexOf(e) === -1) {
            visit(e);
          }
        }
      }

      switch (node.nodeType) {
        case 1:
          str += '\n</' + node.tagName + '>';
          break;
        case 8:
          break;
        case 3:
          break;
        case 9:
          break;
      }

      explored.push(node);
    }

    visit(this);

    return str;
  }
});

/**
 * `innerHTML`.
 */

Object.defineProperty(Node.prototype, 'innerHTML', {
  set: function(val){
    var body = dom(val).document.body;
    this.childNodes.length = 0;
    for (var i = 0; i < body.childNodes.length; i++) {
      this.childNodes.push(body.childNodes[i]);
    }
  },

  get: function(){
    // XXX: totally basic impl
    var val = [];
    for (var i = 0, n = this.childNodes.length; i < n; i++) {
      // text node
      if (3 === this.childNodes[i].nodeType)
        val.push(this.childNodes[i].nodeValue);
      else // recurse, there's a better way to do it
        val.push(this.childNodes[i].outerHTML);
    }
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
      var node = new Node({
        nodeValue: val,
        nodeName: '#text',
        nodeType: 3
      });
      node.parentNode = this;
      this.childNodes.push(node);
      return node;
    }
  }
});

/**
 * `getAttribute`.
 */

Node.prototype.getAttribute = function(name){
  if (this.attributes && this.attributes[name]) {
    return this.attributes[name].value;
  } else {
    for (var i = 0; i < this.attributes.length; i++) {
      var a = this.attributes[i];
      if (a.name === name) {
        return a.value;
      }
    }
  }
  return null;
};

/**
 * `setAttribute`.
 */

Node.prototype.setAttribute = function(name, val){
  // for text/comment nodes
  if (!this.attributes) return;

  // create if doesn't exist
  if (!this.attributes[name]) {
    var attribute = new Attribute();
    attribute.name = name;
    attribute.value = val;
    this.attributes.push(attribute);
    this.attributes[name] = attribute;
  } else {
    this.attributes[name].value = val; 
  }
};

/**
 * `insertBefore`
 */

Node.prototype.insertBefore = function(newChild, refChild){
  var i = this.childNodes.indexOf(refChild);
  if (i != -1) {
    newChild.parentNode = this;
    this.childNodes.splice(i, 0, newChild);
  }
};

/**
 * `replaceChild`
 */

Node.prototype.replaceChild = function(newChild, oldChild){
  var i = this.childNodes.indexOf(oldChild);
  if (i != -1) {
    oldChild.parentNode = undefined;
    newChild.parentNode = this;
    this.childNodes.splice(i, 1, newChild);
  }
};

/**
 * `remoteAttribute`
 * @param name
 */

Node.prototype.removeAttribute = function(name){
  if (!this.attributes) return;
  var attr = this.getAttribute(name);
  var index = this.attributes.indexOf(attr);
  this.attributes.splice(index, 1);
};

/**
 * `removeChild`
 */

Node.prototype.removeChild = function(oldChild){
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

Node.prototype.appendChild = function(newChild){
  var i = this.childNodes.indexOf(newChild);
  if (i != -1) this.childNodes.splice(i, 1);
  newChild.parentNode = this;
  this.childNodes.push(newChild);
  return newChild;
};

/**
 * `hasChildNodes`
 */

Node.prototype.hasChildNodes = function(){

};

/**
 * `cloneNode`
 */

Node.prototype.cloneNode = function(deep){
  function clone(el) {
    var c = new Node({
      nodeName: el.nodeName,
      nodeValue: el.nodeValue,
      nodeType: el.nodeType,
      textContent: el.textContent
    });

    switch(el.nodeType) {
      case 1:
        c.attributes = [];
        for (var i = 0; i < el.attributes.length; i++) {
          c.attributes.push(el.attributes[i]);
        }
        break;
      case 3:

        break;
      case 8:

        break;
      case 9:

        break;
    }

    return c;
  }

  var discovered = [];
  var explored = [];

  function visit(node, cloneNode) {
    discovered.push(node);

    // li, li
    //  -> span, li
    //  -> span, li

    var a = clone(node);

    if (cloneNode) {
      a.parentNode = cloneNode;
      cloneNode.childNodes.push(a);
    }

    if (deep) {
      if (node.childNodes) {
        for (var i = 0; i < node.childNodes.length; i++) {
          var e = node.childNodes[i];
          if (explored.indexOf(e) === -1) {
            visit(e, a);
          }
        }
      }
    }

    explored.push(node);

    if (!cloneNode)
      return a;
  }

  return visit(this);
};

function serializeAttributes(node) {
  var val = [];
  for (var i = 0, n = node.attributes.length; i < n; i++) {
    val.push(' ' + node.attributes[i].name + '="' + node.attributes[i].value + '"');
  }
  return val.join('');
}