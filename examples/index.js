var dom = require('..');

var d = dom('<!DOCTYPE html><html><div class="hello world" id="world"><span></span><span></span></div><div></div></html>');

console.log(d.document.outerHTML);