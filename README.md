# Tower Server DOM

A DOM implementation for Node.js using Google's Gumbo (HTML5 Parser written in C).

## Initial Requirements

These are the initial requirements for this module.

* HTML5 specification implementation (thanks to Gumbo)
* Solid & Simple API
* No Memory Leaks(!)
* Fast (thanks to Gumbo)

## Install

NPM:

```
npm install tower-server-dom
```

## Usage

Require it:

```js
var dom = require('tower-server-dom');
```

Parse some HTML:

```js
dom('<html></html>');
```

Get a document object:

```js
var document = dom('<html></html>').document;
```

Get a window object:

```js
var window = dom('<html></html>').window;
```

Serialize the DOM:

```js
var document = dom('<html><div id="hello"></div></html>').document;
var string = document.childNodes[0].outerHTML;
```


## API

```js
var dom = require('tower-server-dom');
```

### dom(html, options);

Returns an object containing `document` and `window` properties.

```js
dom('<html></html>', {}); // options are currently not used.
```

## Testing

We use mocha for all the tests.

```
mocha
```

## License

The MIT License (MIT)

Copyright (c) 2013 Daniel Fagnan <dnfagnan@gmail.com>
                   Lance Pollard <lancejpollard@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
