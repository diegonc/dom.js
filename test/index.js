var dom = require('..'),
    assert = require('assert'),
    Window = dom.Window,
    Document = dom.Document,
    Node = dom.Node,
    Tree = dom.Tree;


describe('dom', function(){

  it('should return a function', function(){
    assert('function' === typeof dom);
  });

  it('should return a document and window instance', function(){
    var d = dom('<html></html>');
    assert(d.document instanceof Document);
    assert(d.window instanceof Window);
  });

  it('should store the parsed documentElement within the document', function(){
    var d = dom('<html></html>');
    assert(d.document.documentElement);
  });

  it('should store the document within the window', function(){
    var d = dom('<html></html>');
    assert(d.window.document);
  });

});