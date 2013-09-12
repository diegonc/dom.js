var dom = require('..');
var assert = require('assert');

var document = dom('<html><div id="hello"></div></html>').document;

assert(document.getElementById("hello") instanceof dom.Element);