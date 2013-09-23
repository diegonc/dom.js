
/**
 * Expose `Attribute`.
 */

exports = module.exports = Attribute;

/**
 * Attribute constructor
 */

function Attribute() {
  this.nodeType = 2;
  this.name = null;
  this.value = null;
  // http://www.w3schools.com/dom/prop_attr_specified.asp
  this.specified = true;
}