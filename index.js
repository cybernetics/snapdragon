'use strict';

var extend = require('extend-shallow');
var Renderer = require('./lib/renderer');
var Parser = require('./lib/parser');

/**
 * Initialize `Snapdragon` with the given `string` and `options`.
 *
 * @param {String} `str`
 * @param {Object} `options`
 * @api public
 */

function Snapdragon(str, options) {
  if (!(this instanceof Snapdragon)) {
    return new Snapdragon(str, options);
  }
  this.options = options || {};
  this.input = str;
}

Snapdragon.prototype = {
  constructor: Snapdragon,

  /**
   * Parse the given string into an ast by calling
   * each parser in the middleware stack.
   *
   * @param  {String} `str` String to parse
   * @param  {Object} `options`
   * @return {Object} Returns a parsed ast
   * @api public
   */

  parser: function(str, options) {
    if (typeof str !== 'string') {
      options = str;
      str = this.input;
    }
    var opts = extend({}, this.options, options);
    return new Parser(str, opts);
  },

  /**
   * Render a string by visiting over an array of ast nodes.
   *
   * @param  {Object} `ast`
   * @param  {Object} `options`
   * @return {String} Rendered string.
   * @api public
   */

  renderer: function(ast, options) {
    var opts = extend({}, this.options, options);
    return new Renderer(ast, options);
  }
};

/**
 * Expose `Snapdragon`
 */

module.exports = Snapdragon;

/**
 * Expose `Parse` and `Render`
 */

module.exports.Parser = Parser;
module.exports.Renderer = Renderer;
