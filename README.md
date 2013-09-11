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

MIT