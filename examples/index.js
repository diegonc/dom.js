var dom = require('..');

var d = dom('<!DOCTYPE html><html><div><span></span><span></span></div><div></div></html>');

console.log(d.document.outerHTML);