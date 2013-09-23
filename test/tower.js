var dom = require('..'),
    assert = require('assert'),
    Window = dom.Window,
    Document = dom.Document,
    Node = dom.Node,
    Tree = dom.Tree,
    Element = dom.Element,
    Text = dom.Text,
    Attribute = dom.Attribute,
    content = require('tower-content'),
    directive = require('tower-directive'),
    template = require('tower-template');

require('tower-text-directive');
describe('tower', function(){

  it('should parse a template', function(){
    var d = dom('<html><div id="two" data-text="hello"></div></html>');
    var data = content('hello').init({ hello: 123 });
    var fn = template(d.document);
    fn(data);
    console.log(d.document.getElementById("two").outerHTML);
  });

});