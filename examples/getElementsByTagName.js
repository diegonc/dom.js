var dom = require('..');
var assert = require('assert');

var document = dom('<html><div></div><div></div></html>').document;

assert(document.getElementsByTagName("div").length === 2);