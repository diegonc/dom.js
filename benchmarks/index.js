var dom = require('..');

var time = new Date().getTime();
dom('<html><head><body><div></div><span></span></body></head></html>');
console.log(((new Date()).getTime() - time) + "ms");

