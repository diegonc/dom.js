# Tower Server DOM

A DOM implementation for Node.js using Google's Gumbo (HTML5 C Parser).

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

var d = dom('<html><body><div id="hello"></div></body></html>');
d.window.getElementById("hello"); // Node instance
d.document // Document instance
```

### Test

```
mocha
```

### License

MIT