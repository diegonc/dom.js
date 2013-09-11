var dom = require('..');

var time2 = new Date().getTime();
var d = dom('<html><head><body><div></div><span></span></body></head></html>');
d.document.childNodes[0].outerHTML;
console.log(((new Date()).getTime() - time2) + "ms");