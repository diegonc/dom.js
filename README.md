# Tower Server DOM

A DOM implementation for Node.js using Google's Gumbo (HTML5 Parser written in C).

### Initial Requirements

These are the initial requirements for this module.

* Implement the basic DOM specification.
* Solid & Simple API
* No Memory Leaks
* Somewhat fast. (As fast as you can get with JavaScript)

### Future Requirements

* Implement the full HTML DOM specification (including the HTML5 one)
* Full test coverage

### Install

NPM:

```
npm install tower-server-dom
```

### Usage

```js
var dom = require('tower-server-dom');
```

### API

#### Dom([String] html)

This is the entry point to the module. This will parse the `html` input using Gumbo and convert it to a mutable DOM.

**Note:** This is an HTML__5__ parser.

```js
dom('<html></html>');
```

### Test

```
mocha
```

### License

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