# Tower Server DOM

A DOM implementation for Node.js using Google's Gumbo (HTML5 C Parser).

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