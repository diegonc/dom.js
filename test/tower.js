var dom = require('..'),
    assert = require('assert'),
    Window = dom.Window,
    Document = dom.Document,
    Node = dom.Node,
    Tree = dom.Tree,
    Element = dom.Element,
    Text = dom.Text,
    Attribute = dom.Attribute,
    template = require('tower-template'),
    content = require('tower-content'),
    directive = require('tower-directive');

describe('tower', function(){

  it('should parse a template', function(){
    var d = dom('<html><div id="two" data-text="hello"></div></html>');
    var c = content('hello').init({ hello: 123 });
    //template(d.document);
    //console.log(d.document.getElementById("two").outerHTML);
  });

});