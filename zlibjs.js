/** remove() method for DOM-elements. */
Element.prototype.remove = function() {
        this.parentElement.removeChild(this);
    };

/** Implement last() method for collections of DOM-elements. */
 NodeList.prototype.last = HTMLCollection.prototype.last = function() {
        return this[this.length - 1];
    };

/** Function that fixes a case when TextNode returns instead of HTML element (in FF at least). */
    function getFirstChild(elem) {
        var firstChild = elem.firstChild;

        while (firstChild && firstChild.nodeType !== 1) {
            firstChild = firstChild.nextSibling;
        }

        return firstChild;
    }

/** Simplify standard debug method to shortest 'log'. Also this is a good example of a bad practice - change basic prototypes. We overwrite the Math.log() method, better use '_log'. */
if (typeof console !== 'undefined' && typeof console.log !== 'undefined') {
    Object.prototype.log = function() {
        console.log.apply(console, arguments);
    };
}

/** Useful for loops. Finally invoke 'console.store.s;'. */
if (typeof console !== 'undefined' && Object.isExtensible(console)) {
    console.store = console.store || {};
    console.store.basket = console.store.basket || '';
    console.store.__defineSetter__('s', function(msg) { return this.basket +=
        /* optionally: (new Date).getTime() + */ msg + ';\n'; });
    console.store.__defineGetter__('s', function() { alert(this.basket); });
}

/**
 * @author Addi Osmani
 * Adding outline borders to each element on the page.
 */
(function(a){
    [].forEach.call(
        document.querySelectorAll(a),
        function(b) {
            b.style.outline = '1px solid #' + (~~(Math.random()*(1<<24))).toString(16)
        }
    )
})('*');

/**
 * @author zhibirc
 * Multiply string N-times - first edition.
 */
String.prototype.multiChar = function(multi) {
    for (var i = multi, str = ''; i--; str += this);
    return str;
};

/**
 * @author zhibirc
 * Multiply string N-times - second edition.
 */
String.prototype.multiChar = function(multi) {
	return new Array(++multi).join(this);
};

/**
 * @author zhibirc
 * Implement well known and standard behaviour of constants.
 */
var CONST = (function() {
    var constStore = {};

    return function(name, value) {
        if (typeof value === 'undefined') {
            return constStore[name];
        } else {
            Object.defineProperty(constStore, name, {
                __proto__: null,
                value: value
            });
            return 0;
        }
    }
}());

/**
 * @author zhibirc
 * Multifunctional event installer on DOM elements.
 */
function addHandler(elems, actions) {
    'use strict';

    var errors = ['Wrong call! Properly syntax: addHandler(\'element_0, element_1, ..., element_N\', { event_0: callback_0, event_1: callback_1, ..., event_N: callback_N})'],
        elem;

    /** The aim of this approach is unobtrusively display an error (and return particular marker) without panic, because wrong call may be no matter for the main functionality. */
    if (arguments.length !== 2 || {}.toString.call(elems).slice(8, -1) !== 'Array' || !(actions instanceof Object)) {
        if (typeof console !== 'undefined' && typeof console.warn !== 'undefined') {
            console.warn(errors[0]);
        }
        return 0;
    }

    for (var i = elems.length; i--;) {
        elem = elems[i];
        for (var event in actions) {
            if (actions.hasOwnProperty(event)) {
                if (elem.addEventListener) {
                    elem.addEventListener(event, actions[event], false);
                } else if (elem.attachEvent) {
                    elem.attachEvent('on' + event, function() { actions[event].call(elem); });
                } else {
                    elem['on' + event] = actions[event];
                }
            }
        }
    }
}

/**
 * @author zhibirc
 * PHP function number_format in JS.
 */
function numberFormat(value, decimal, delim, thousands_sep) {
'use strict';
    if (typeof value !== 'number' || !isFinite(value)) {
        throw new TypeError('Parameter "value" must be a real Number!');
    }
    var resultValue = value,
        delimiter = delim || '.',
        digitParts = [],
        intPart = '';

    decimal && (resultValue = resultValue.toFixed(decimal));
    resultValue = parseInt(resultValue, 10) + delimiter + String(resultValue).split(/\W+/)[1];
    if (thousands_sep) {
        digitParts = resultValue.split(delimiter);
        intPart = digitParts[0].replace(new RegExp("^(\\d{1,intPart.length - 3})(?=\\d{3})", 'g'), "$1" + thousands_sep);
        resultValue = intPart + delimiter + digitParts[1];
    }
    return resultValue;
}

/**
 * @author zhibirc
 * Extend jQuery-prototype ($.fn) with method serializeToJSON().
 */
$.fn.extend({
	serializeToJSON: function() {
		return '"{' + $(this).serialize()
			.split('&')
			.map(function(elem) { return elem.split('='); })
			.map(function(elem) {
				return elem.map(function(elem, idx, array) {
					var __elem;
					elem = elem.replace(/(%[\da-f]+)/ig, function(group_0) { return decodeURIComponent(group_0); });
					idx && (__elem = +elem);
					return isFinite(__elem) ? elem : '"' + elem + '"';
				});
			})
			.map(function(elem) { return elem.join(':')})
			.join(',') + '}"'; 
		}
	});
	
/** Extend DOM Element prototype to implement functionality of eventListenerList (proposal function which has been removed from the spec draft). */
(function() {
  Element.prototype.eventListenerList = {};
  Element.prototype._addEventListener = Element.prototype.addEventListener;
  Element.prototype.addEventListener = function(a,b,c) {
    this._addEventListener(a,b,c);
    if(!this.eventListenerList[a]) this.eventListenerList[a] = [];
    this.eventListenerList[a].push(b);
  };
})();

/**
 * @author zhibirc
 * Returns an array of longest words.
 */
// TODO: add the functionality to determine the level of 'longest'.
function getLongestWord(str) {
  'use strict';
  var normalize = str.split(/[^-a-zа-я\d]/i),
      max_len = Math.max.apply(Math, normalize.map(function(elem) { return elem.length; })); 
  return str.match(RegExp('[а-я]{' + max_len + '}', 'ig'));
 }