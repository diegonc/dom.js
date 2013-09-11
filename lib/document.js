/**
 * Module dependencies.
 */

var Node = require('./node'),
    util = require('util');

/**
 * Module Exports
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
  Node.call(this);
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
 */

Document.prototype.createElement = function() {

};

/**
 * `createDocumentFragment`
 */

Document.prototype.createDocumentFragment = function() {

};

/**
 * `createTextNode`
 */

Document.prototype.createTextNode = function() {

};

/**
 * `createComment`
 */

Document.prototype.createComment = function() {

};

/**
 * `createCDATASection`
 */

Document.prototype.createCDATASection = function() {

};

/**
 * `createProcessingInstruction`
 */

Document.prototype.createProcessingInstruction = function() {

};

/**
 * `createAttribute`
 */

Document.prototype.createAttribute = function() {

};

/**
 * `createEntityReference`
 */

Document.prototype.createEntityReference = function() {

};

/**
 * `getElementsByTagName`
 */

Document.prototype.getElementsByTagName = function(tagname) {

};

/**
 * `importNode`
 */

Document.prototype.importNode = function(importedNode, deep) {

};

/**
 * `createElementNS`
 */

Document.prototype.createElementNS = function() {

};

/**
 * `createAttributeNS`
 */

Document.prototype.createAttributeNS = function() {

};

/**
 * `getElementsByTagNameNS`
 */

Document.prototype.getElementsByTagNameNS = function() {

};

/**
 * `getElementById`
 */

Document.prototype.getElementById = function(elementId) {

};