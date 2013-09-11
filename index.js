/**
 * Module dependencies
 */

var parser = require('gumbo-parser'),
    Document = require('./lib/document'),
    Window = require('./lib/window');

/**
 * Module exports
 */

exports = module.exports = init;

/**
 * Init Function
 *
 * This parses the initial HTML input and returns the
 * appropriate `document` and `window` object.
 *
 */