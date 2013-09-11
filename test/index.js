var dom = require('..'),
    assert = require('assert'),
    Window = dom.Window,
    Document = dom.Document,
    Node = dom.Node,
    Tree = dom.Tree,
    Element = dom.Element,
    Attribute = dom.Attribute;


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
    //assert(d.document.documentElement);
  });

  it('should store the document within the window', function(){
    var d = dom('<html></html>');
    assert(d.window.document instanceof Document);
  });

});

describe('tree', function(){

  it('should have `html` node as child', function(){
    var d = dom('<html></html>');
    assert(d.document.childNodes[0] instanceof Element);
    assert(d.document.childNodes[0].tagName === "html");
  });

  it('should have empty attributes array in `html` node', function(){
    var d = dom('<html></html>');
    assert(d.document.childNodes[0].attributes.length === 0);
  });

  it('should implement missing `head` and `body` nodes', function(){
    var d = dom('<html></html>');
    assert(d.document.childNodes[0].childNodes.length === 2);
    assert(d.document.childNodes[0].childNodes[0].tagName === "body");
    assert(d.document.childNodes[0].childNodes[1].tagName === "head");
  });

  it('should return a single attribute object', function(){
    var d = dom('<html><body><div id="hello"></div></body></html>');
    assert(d.document
      .childNodes[0]
      .childNodes[0]
      .childNodes[0]
      .attributes
      .length === 1
    );
    assert(d.document
      .childNodes[0]
      .childNodes[0]
      .childNodes[0]
      .attributes[0] instanceof Attribute
    );
    assert(d.document
      .childNodes[0]
      .childNodes[0]
      .childNodes[0]
      .attributes[0].name === "id"
    );
    assert(d.document
      .childNodes[0]
      .childNodes[0]
      .childNodes[0]
      .attributes[0].value === "hello"
    );
  });

  it('should parse deep nodes', function(){
    var d = dom('<html><div></div></html>');
    assert(d.document.childNodes[0].childNodes[0] instanceof Element);
    assert(d.document.childNodes[0].childNodes[0].childNodes[0].tagName === "div");
  });

});

describe('document', function(){

  it('should get single element with `getElementsByTagName`', function(){
    var d = dom('<html><div></div></html>');
    var elems = d.document.getElementsByTagName('div');
    assert(elems.length === 1);
    assert(elems[0] instanceof Element);
    assert(elems[0].tagName === "div");
  });

  it('should get single element with `getElementById`', function(){
    var d = dom('<html><div id="hello"></div></html>');
    var elem = d.document.getElementById('hello');
    assert(elem instanceof Element);
    assert(elem.attributes.length === 1);
    assert(elem.attributes[0] instanceof Attribute);
    assert(elem.attributes[0].name === "id");
    assert(elem.attributes[0].value === "hello");
  });

});


describe('serialize', function(){

  it('should serialize document', function(){
    var html = '<!DOCTYPE html><html></html>';
    var d = dom(html);

    assert(d.outerHTML === html);
  });

});

describe('element', function(){

  it('should createElement', function(){
    var d = dom('<html></html>');
    var elem = d.document.createElement('div');
    assert('div' === elem.tagName);
  });

  it('should appendChild', function(){
    var document = dom('<html><body><div id="hello"></div></body></html>').document;
    var elem = document.createElement('div');
    assert(1 === document.body.childNodes.length);
    document.body.appendChild(elem);
    assert(2 === document.body.childNodes.length);
    document.body.appendChild(elem);
    assert(2 === document.body.childNodes.length);
  });

});