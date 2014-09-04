(function outer(modules, cache, entries){

  /**
   * Global
   */

  var global = (function(){ return this; })();

  /**
   * Require `name`.
   *
   * @param {String} name
   * @param {Boolean} jumped
   * @api public
   */

  function require(name, jumped){
    if (cache[name]) return cache[name].exports;
    if (modules[name]) return call(name, require);
    throw new Error('cannot find module "' + name + '"');
  }

  /**
   * Call module `id` and cache it.
   *
   * @param {Number} id
   * @param {Function} require
   * @return {Function}
   * @api private
   */

  function call(id, require){
    var m = cache[id] = { exports: {} };
    var mod = modules[id];
    var name = mod[2];
    var fn = mod[0];

    fn.call(m.exports, function(req){
      var dep = modules[id][1][req];
      return require(dep ? dep : req);
    }, m, m.exports, outer, modules, cache, entries);

    // expose as `name`.
    if (name) cache[name] = cache[id];

    return cache[id].exports;
  }

  /**
   * Require all entries exposing them on global if needed.
   */

  for (var id in entries) {
    if (entries[id]) {
      global[entries[id]] = require(id);
    } else {
      require(id);
    }
  }

  /**
   * Duo flag.
   */

  require.duo = true;

  /**
   * Expose cache.
   */

  require.cache = cache;

  /**
   * Expose modules
   */

  require.modules = modules;

  /**
   * Return newest require.
   */

   return require;
})({
1: [function(require, module, exports) {

var app = angular.module('app', []);

app.directive('slot', require('../lib/index.js'));


}, {"../lib/index.js":2}],
2: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var format = require('bdo-labs/format').format;

/**
 * Expose `slot`.
 */

module.exports = slot;

/**
 * Slot directive
 *
 * Animates a numeric value like a slot-machine.
 * It will in fact replace the `innerText` of the
 * element.
 */

function slot(){
  function link(scope, el, attrs){
    var spinning = false;
    function startSpin(prior){
      if (spinning) return;
      spinning = true;
      var to = parseFloat(prior);
      if (isNaN(to)) return el.text(prior);
      var from = 0;
      var unit = prior.replace(/[\d\.\,]+/g, '');
      var steps = Math.floor(Math.random() * 30);
      var delay = 30;
      function spin(){
        from += to / steps;
        var str = format('%d%s', from, unit);
        if (from < to) {
          setTimeout(spin, delay);
        }
        else {
          str = format('%d%s', to, unit);
          spinning = false;
        }
        el.text(str);
      }
      spin();
    }
    attrs.$observe('slot', startSpin);
  }
  return {
    restrict: 'A',
    link: link
  };
}


}, {"bdo-labs/format":3}],
3: [function(require, module, exports) {
//
// format, printf-like string formatting for JavaScript
// github.com/samsonjs/format
//
// Copyright 2010 - 2011 Sami Samhuri <sami@samhuri.net>
// ISC license
//

exports.printf = function(/* ... */) {
    console.log(exports.format.apply(this, arguments));
};

exports.format = function(format) {
    var argIndex = 1 // skip initial format argument
      , args = [].slice.call(arguments)
      , i = 0
      , n = format.length
      , result = ''
      , c
      , escaped = false
      , arg
      , precision
      , nextArg = function() { return args[argIndex++]; }
      , slurpNumber = function() {
              var digits = '';
              while (format[i].match(/\d/))
                  digits += format[i++];
              return digits.length > 0 ? parseInt(digits) : null;
          }
      ;
    for (; i < n; ++i) {
        c = format[i];
        if (escaped) {
            escaped = false;
            precision = slurpNumber();
            switch (c) {
            case 'b': // number in binary
                result += parseInt(nextArg(), 10).toString(2);
                break;
            case 'c': // character
                arg = nextArg();
                if (typeof arg === 'string' || arg instanceof String)
                    result += arg;
                else
                    result += String.fromCharCode(parseInt(arg, 10));
                break;
            case 'd': // number in decimal
                result += parseInt(nextArg(), 10);
                break;
            case 'f': // floating point number
                result += parseFloat(nextArg()).toFixed(precision || 6);
                break;
            case 'o': // number in octal
                result += '0' + parseInt(nextArg(), 10).toString(8);
                break;
            case 's': // string
                result += nextArg();
                break;
            case 'x': // lowercase hexadecimal
                result += '0x' + parseInt(nextArg(), 10).toString(16);
                break;
            case 'X': // uppercase hexadecimal
                result += '0x' + parseInt(nextArg(), 10).toString(16).toUpperCase();
                break;
            default:
                result += c;
                break;
            }
        } else if (c === '%') {
            escaped = true;
        } else {
            result += c;
        }
    }
    return result;
};

exports.vsprintf = function(format, replacements) {
    return exports.format.apply(this, [format].concat(replacements));
};

exports.sprintf = exports.format;

}, {}]}, {}, {"1":""})
