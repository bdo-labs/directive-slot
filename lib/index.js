
/**
 * Module dependencies.
 */

var raf = require('component/raf');
var format = require('bdo-labs/format').format;

/**
 * Expose `slot`.
 */

module.exports = slot;

/**
 * Slot directive
 *
 * Animates a numeric value like a slot-machine.
 * It will in-fact replace the `innerText` of the
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
      function spin(){
        from += to / steps;
        var str = format('%d%s', from, unit);
        if (from < to) {
          raf(spin);
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

