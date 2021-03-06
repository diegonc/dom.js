
/**
 * Module dependencies.
 */

var Node = require('./node');
var Element = require('./element');
var Text = require('./text');
var CharacterData = require('./characterData');
var util = require('util');

/**
 * Expose `Document`.
 */

exports = module.exports = Document;

/**
 * Document constructor
 *
 * XXX: Only need to implement the following:
 *      - getElementById
 *      - getElementsByTagName
 */

function Document(options) {
  if (!options) options = {};
  Node.call(this, options);
  this.doctype = options.doctype;
  this.implementation = options.implementation;
  this.documentElement = options.documentElement;
}

/**
 * Inherit from the Node class
 */

util.inherits(Document, Node);

/**
 * `createElement`
 *
 * @param {String} name
 */

Document.prototype.createElement = function(name){
  return new Element({ nodeName: name });
};

/**
 * `createDocumentFragment`
 */

Document.prototype.createDocumentFragment = function(){

};

/**
 * `createTextNode`
 */

Document.prototype.createTextNode = function(val){
  return new Text(val);
};

/**
 * `createComment`
 */

Document.prototype.createComment = function(data){
  var comment = new CharacterData();
  comment.nodeType = 8;
  comment.data = data;
  comment.length = data.length;
  return comment;
};

/**
 * `createCDATASection`
 */

Document.prototype.createCDATASection = function(){

};

/**
 * `createProcessingInstruction`
 */

Document.prototype.createProcessingInstruction = function(){

};

/**
 * `createAttribute`
 */

Document.prototype.createAttribute = function(){

};

/**
 * `createEntityReference`
 */

Document.prototype.createEntityReference = function(){

};

/**
 * `getElementsByTagName`
 *
 * This gets __all__ elements that match the tag name.
 */

Document.prototype.getElementsByTagName = function(tagName){
  var elements = [];
  var queue = [];
  queue.push(this);

  var node;

  while (queue.length) {
    node = queue.pop();

    if (node.tagName === tagName)
      elements.push(node);

    for (var i = 0, n = node.childNodes.length; i < n; i++) {
      var _node = node.childNodes[i];
      queue.push(_node);
    }
  }

  return elements;
};

/**
 * `importNode`
 */

Document.prototype.importNode = function(importedNode, deep){

};

/**
 * `createElementNS`
 */

Document.prototype.createElementNS = function(){

};

/**
 * `createAttributeNS`
 */

Document.prototype.createAttributeNS = function(){

};

/**
 * `getElementsByTagNameNS`
 */

Document.prototype.getElementsByTagNameNS = function(){

};

/**
 * `getElementById`
 */

Document.prototype.getElementById = function(elementId){
  var queue = [];
  queue.push(this);

  var node;
  
  while (queue.length) {
    node = queue.pop();
    if (node.attributes && node.attributes.length) {
      // Check for the id.
      for (var i = 0; i < node.attributes.length; i++) {
        var attr = node.attributes[i];
        if (attr.name === 'id' && attr.value === elementId) {
          return node;
        }
      }
    }

    // Go through each child if not found.
    for (var k = 0; k < node.childNodes.length; k++) {
      var n = node.childNodes[k];
      queue.push(n);
    }
  }

  return null;
};

/**
 * `querySelector`.
 */

Document.prototype.querySelector = function(selector){
  // https://github.com/component/zest
};

/**
 * `querySelectorAll`.
 */

Document.prototype.querySelectorAll = function(selector){

};