var dom = require('..'),
    assert = require('assert'),
    Window = dom.Window,
    Document = dom.Document,
    Node = dom.Node,
    Tree = dom.Tree,
    Element = dom.Element,
    Text = dom.Text,
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
    assert(d.document.childNodes[0].childNodes[1].tagName === "body");
    assert(d.document.childNodes[0].childNodes[0].tagName === "head");
  });

  it('should return a single attribute object', function(){
    var d = dom('<html><body><div id="hello"></div></body></html>');
    assert(d.document
      .childNodes[0]
      .childNodes[1]
      .childNodes[0]
      .attributes
      .length === 1
    );
    assert(d.document
      .childNodes[0]
      .childNodes[1]
      .childNodes[0]
      .attributes[0] instanceof Attribute
    );
    assert(d.document
      .childNodes[0]
      .childNodes[1]
      .childNodes[0]
      .attributes[0].name === "id"
    );
    assert(d.document
      .childNodes[0]
      .childNodes[1]
      .childNodes[0]
      .attributes[0].value === "hello"
    );
  });

  it('should parse deep nodes', function(){
    var d = dom('<html><div></div></html>');
    assert(d.document.childNodes[0].childNodes[1] instanceof Element);
    assert(d.document.childNodes[0].childNodes[1].childNodes[0].tagName === "div");
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

  /**it('should serialize document', function(){
    var html = '<!DOCTYPE html><html></html>';
    var d = dom(html);

    assert(d.outerHTML === html);
  });**/

});

describe('element', function(){

  it('should createElement', function(){
    var d = dom('<html></html>');
    var elem = d.document.createElement('div');
    assert('div' === elem.tagName);
  });

  it('should have textContent', function(){
    var d = dom('<html><div></div></html>');
    assert(d.document.childNodes[0].childNodes[1].childNodes[0].textContent == "");
  });

  it('should appendChild', function(){
    var document = dom('<html><body><div id="hello"></div></body></html>').document;
    var elem = document.createElement('div');
    assert(1 === document.body.childNodes.length);
    document.body.appendChild(elem);
    assert(2 === document.body.childNodes.length);
    assert(elem.parentNode === document.body);
    document.body.appendChild(elem);
    assert(2 === document.body.childNodes.length);
  });

  it('should removeChild', function(){
    var document = dom('<html><body><div id="hello"></div></body></html>').document;
    var elem = document.getElementById('hello');
    assert(1 === document.body.childNodes.length);
    document.body.removeChild(elem);
    assert(0 === document.body.childNodes.length);
    assert(undefined === elem.parentNode);
  });

  it('should replaceChild', function(){
    var document = dom('<html><body><div id="hello"></div></body></html>').document;
    var elem = document.getElementById('hello');
    var newElem = document.createElement('span');
    assert(1 === document.body.childNodes.length);
    document.body.replaceChild(newElem, elem);
    assert(1 === document.body.childNodes.length);
    assert(undefined === elem.parentNode);
    assert(document.body === newElem.parentNode);
  });

  it('should insertBefore', function(){
    var document = dom('<html><body><div id="hello"></div></body></html>').document;
    var elem = document.getElementById('hello');
    var newElem = document.createElement('span');
    assert(1 === document.body.childNodes.length);
    document.body.insertBefore(newElem, elem);
    assert(2 === document.body.childNodes.length);
    assert(document.body === elem.parentNode);
    assert(document.body === newElem.parentNode);
    var refIndex = document.body.childNodes.indexOf(elem);
    var newIndex = document.body.childNodes.indexOf(newElem);
    assert(1 === refIndex);
    assert(0 === newIndex);
  });

  it('should clone', function(){
    var document = dom('<html><body><div id="hello"><div></div></div></body></html>').document;
    var elem = document.getElementById('hello');
    var clone = elem.cloneNode(true);
    assert(1 === clone.childNodes.length);
    assert(clone === clone.childNodes[0].parentNode);
  });

  it('should get innerHTML', function(){
    var document = dom('<html><body><div id="hello"><div>world</div></div></body></html>').document;
    var elem = document.getElementById('hello');
    assert(elem.innerHTML === '<div>world</div>');
  });

  it('should get outerHTML', function(){
    var document = dom('<html><body><div id="hello"><div>world</div></div></body></html>').document;
    var elem = document.getElementById('hello');
    assert(elem.outerHTML === '<div id="hello"><div>world</div></div>');
  });

  it('should getAttribute', function(){
    var document = dom('<html><body><div id="hello"></div></body></html>').document;
    var elem = document.getElementById('hello');
    assert('hello' === elem.getAttribute('id'));
  });

  it('should setAttribute', function(){
    var document = dom('<html><body><div id="hello"></div></body></html>').document;
    var elem = document.getElementById('hello');
    elem.setAttribute('id', 'foo');
    assert('foo' === elem.getAttribute('id'));
    elem.setAttribute('title', 'Foo');
    assert('Foo' === elem.getAttribute('title'));
  });

});

describe('text', function(){

  it('should create text node from string', function(){
    var document = dom('<html><body><div id="hello">world</div></body></html>').document;
    var elem = document.getElementById('hello');
    assert(1 === elem.childNodes.length);
    assert(elem.childNodes[0] instanceof Text);
    assert('world' === elem.childNodes[0].nodeValue);
  });

  it('should createTextNode', function(){
    var document = dom('<html><body></body></html>').document;
    var elem = document.createTextNode('hello world');
    assert(elem instanceof Text);
    assert('hello world' === elem.nodeValue);
  });

  it('should set textContent', function(){
    var document = dom('<html><body><div id="hello"><div></div><div></div></div></body></html>').document;
    var elem = document.getElementById('hello');
    assert('' === elem.textContent);
    assert(2 === elem.childNodes.length);
    elem.textContent = 'world';
    assert('world' === elem.textContent);
    assert(1 === elem.childNodes.length);
    assert(3 === elem.childNodes[0].nodeType);
  });

});