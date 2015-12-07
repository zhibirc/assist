/**
 *  assist
 *  @license
 */
import ERRORS from './assist_errors.js';

let zJS = {},
	doc = document,
	CallError = Object.create(Error.prototype),
	objProto = Object.prototype,
	arrProto = Array.prototype,
	strProto = String.prototype,
	fnProto = Function.prototype,
	// DOM
	fetch, hide, remove, last,
	// UTILS
	drawBounds, setZeroTimeout, typoGraph, origins, checkUAEngine, hasMathMLSupport,
	// MATH
	gcd, factorial, isFib, fibTo, fib, primes, swap, isPowOf2, isMinus0;
	
	zJS.dom = {};
	zJS.util = {};
	zJS.math = {};

/*|-------------------------|
  |	Type detection helpers. |
  |-------------------------|*/

/**
 *	Check if given value is null or undefined.
 *	@param {*} entity - Value for checking.
 */
function isUndef(entity) {
	return entity === null || typeof entity === 'undefined';
}

/**
 *	Check that given value is function.
 *	@param {*} entity - Value for checking.
 */
function isFunc(entity) {
	return typeof entity === 'function';
}

/**
 *	Check that given value is integral number.
 *	@param {*} entity - Value for checking.
 */
function isInt(entity) {
	return typeof entity === 'number' && entity % 1 === 0;
}

/**
 *	Check that given value is HTMLElement
 *	@param {*} entity - Value for checking.
 */
function isHTML(entity) {
	return entity.nodeType === 1 || entity instanceof HTMLCollection;
}

let DOMElementExtendedAPI = {
	hide: hide
});

DOMElementExtendedAPI.__proto__ = HTMLElementPrototype.__proto__;
HTMLElementPrototype.__proto__ = DOMElementExtendedAPI;

/**
 *	Entry point to all DOM methods, gets element/elements for future usage.
 *	@param {(Object|Object[])} elements - Single DOM element or multiple DOM elements.
 */
fetch = function (element) {
	if (arguments.length !== 1 || isUndef(element) || !isHTML(element)) {
		throw new CallError(ERRORS.dom.fetch);
	}
	
	return element;
};

/**
 * @returns {Object}
 */
remove = function () {
	if (arguments.length) {
		throw new CallError(ERRORS.dom.remove);
	}
	
	let parent;
	
	parent = this.parentNode;
	parent.removeChild(this);
	
	return parent;
};

/**
 * Method <_hide_> for DOM elements. Accepts two various behaviours depend on flag. All flags must be numbers.
 * Flag 0 instructs to hide element by change its opacity.
 * Flag 1 instructs to hide element by change its display to "none".
 *
 * @author zhibirc
 * @param {Number} level - Must be 0 or 1.
 * @returns {Object}
 */
hide = function (level) {
	switch (level)  {
		case 0:
			this.style.visibility = 'hidden';
			break;
		case 1:
			this.style.display = 'none';
			break;
		default:
			throw new SyntaxError(errors.hide);
	}
	return this;
};

/**
 * Implement <last> method for collections of DOM elements.
 * @returns {Object}
 */
last = function () {
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

/** Useful for loops. Finally invoke 'console.store.s;'. */
if (typeof console !== 'undefined' && Object.isExtensible(console)) {
	console.store = console.store || {};
	console.store.basket = console.store.basket || '';
	console.store.__defineSetter__('s', function (msg) {
		return this.basket +=
			/* optionally: (new Date).getTime() + */ msg + ';\n';
	});
	console.store.__defineGetter__('s', function () {
		console.log(this.basket);
	});
}

/**
 *	Detect the rendering engine.
 */
checkUAEngine = function () {
	let ua = navigator.userAgent;
	
	return {
		isGecko: ~ua.indexOf('Gecko') && !~ua.indexOf('KHTML') && !~ua.indexOf('Trident'),
		isWebKit: ~ua.indexOf('AppleWebKit') && !~ua.indexOf('Chrome')
	};
};
 
/**
 *	Verify the MathML support.
 */
hasMathMLSupport = function () {
	let div = doc.createElement('div'),
		box;

	div.innerHTML = '<math><mspace height="23px" width="77px"></math>';
	doc.body.appendChild(div);
	box = div.firstChild.firstChild.getBoundingClientRect();
	doc.body.removeChild(div);
	
	return Math.abs(box.height - 23) < 2 && Math.abs(box.width - 77) < 2;
}

// !!! Implement API Support.

/**
 * Adding outline borders to each element on the page.
 */
drawBounds = function (a = '*') {
	[].forEach.call(
		document.querySelectorAll(a),
		function (b) {
			b.style.outline = '1px solid #' + (~~(Math.random() * (1 << 24))).toString(16)
		}
	)
};

// TODO
zJS.util = {
	'*': function (str, multiplier) {
			for (var i = multiplier, str = ''; i--; str += str);
			return str;
			// return Array(++multiplier).join(this);
	}
	
};

/**
 * Complex event installer on DOM elements with old browser support.
 */
function addHandler(elem, actions) { // TODO: polyfills of 'some' and 'Object.keys()' required.
	var errors = ['Wrong syntax, event handlers have not been installed!\n' +
				  'Properly syntax: addHandler(element, { event_0: callback_0, ..., event_N: callback_N })'], evt;
		
	function isValid(n) {
		var keys;
		
		if (objProto.toString.call(n).slice(8, -1) !== 'Object') {
			return false;
		}
		
		keys = Object.keys(n);
		
		if (!+keys || keys.some(function (_) { return typeof n[_] !== 'function'; })) {
			return false;
		}
		
		return true;
	}
	
	if (arguments.length !== 2 || ![1, 9, window].some(function (_) { return _ === elem.nodeType || _ === window; }) || !isValid(actions)) {
		throw new Error(errors[0]);
	}
	
	for (evt in actions) {
		if (objProto.hasOwnProperty.call(actions, evt)) {
			if (elem.addEventListener) {
				elem.addEventListener(evt, actions[evt], false);
			} else if (elem.attachEvent) {
				elem.attachEvent('on' + evt, function () { actions[evt].call(elem); });
			} else {
				elem['on' + evt] = actions[evt];
			}
		}
	}
	
}

/**
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
 * Extend jQuery-prototype ($.fn) with method serializeToJSON().
 */
$.fn.extend({
	serializeToJSON: function () {
		return '"{' + $(this).serialize()
				.split('&')
				.map(function (elem) {
					return elem.split('=');
				})
				.map(function (elem) {
					return elem.map(function (elem, idx, array) {
						var __elem;
						elem = elem.replace(/(%[\da-f]+)/ig, function (group_0) {
							return decodeURIComponent(group_0);
						});
						idx && (__elem = +elem);
						return isFinite(__elem) ? elem : '"' + elem + '"';
					});
				})
				.map(function (elem) {
					return elem.join(':')
				})
				.join(',') + '}"';
	}
});

/**
 * Extend DOM Element prototype to implement functionality of eventListenerList (proposal function which has been removed from the spec draft).
 */
(function () {
	Element.prototype.eventListenerList = {};
	Element.prototype._addEventListener = Element.prototype.addEventListener;
	Element.prototype.addEventListener = function (a, b, c) {
		this._addEventListener(a, b, c);
		if (!this.eventListenerList[a]) this.eventListenerList[a] = [];
		this.eventListenerList[a].push(b);
	};
})();

/**
 * Returns an array of longest words.
 *
 * @todo Add the functionality to determine the level of 'longest'.
 */
function getLongestWord(str) {
	'use strict';
	var normalize = str.split(/[^-a-z?-?\d]/i),
		max_len = Math.max.apply(Math, normalize.map(function (elem) {
			return elem.length;
		}));
	return str.match(RegExp('[?-?]{' + max_len + '}', 'ig'));
}

/**
 * Add arbitrary amount of elements (or elements from an array) to the end of current array.
 */
arrProto['<<'] = function () {
	var args, elems, i, l;
	
	if (!arguments.length) {
		return this;
	}
	
	args = arrProto.slice.call(arguments);
	
	elems = args.length === 1 && Array.isArray(args[0]) ? args[0] : args; 
	
	for (i = 0, l = elems.length; i < l; i += 1) {
		this.push(elems[i]);
	}
	
	return this; // Suitable for chaining purposes.
};

/**
 * Beautify with guillemets and dashes.
 * Select a node in your element inspector and run the following code in console.
 */
typoGraph = function (el) {
	 el.value = el.value
		// replace left-side double quotes
	   .replace(/(^|\s)"/g, '$1«')
		// replace right-side double quotes
	   .replace(/"(\s|[-.,:;?!]|$)/g, '»$1')
		// replace hyphen with a dash
	   .replace(/(\s)-(\s)/g, '$1—$2');
};

/**
 *	Find original values in an array, optionally preserve order.
 *	@param {Object[]} lst - Array with duplicates.
 *	@param {boolean} [preserveOrder=true] - Is it needed to preserve elements order.
 */
origins = function (lst, preserveOrder = true) {
	let l = arguments.length;
	
	if (!l || l > 2 || !Array.isArray(lst) || ![true, false].some(v => v === preserveOrder)) {
		throw new CallError(ERRORS.util.origins);
	}
	
	if (preserveOrder) {
		return Set(arr).forEach(v => r.push(v));
	} else {
		return Object.keys(arr.reduce((r, v) => r[v] = 1 && r, {})).map(Number);
	}
};

/** Minimize timeout. */
setZeroTimeout = (function () {
	let fn, ctx;

	window.addEventListener('message', function () {
		if (fn) {
			fn.call(ctx);
		}
	}, false);

	return function(_fn, _ctx) {
		fn = _fn;
		ctx = _ctx;
		window.postMessage('', '*');
	};
})();

/*|----------------------------------------------------------------------------------|
  | MATH functions and algorithms implemented as extensions of Math built-in object. |
  |----------------------------------------------------------------------------------|*/
 
 /** Get Greatest Common Divisor (Highest Common Factor). */
 gcd = function _(a, b) {
	 return b ? _(b, a % b) : a; // Instead of use arguments.callee
 }
 
 /** Get factorial with Tail call optimization. */
 factorial = function (n) {
	 if (!isInt(n)) {
		 throw new CallError(ERRORS.math.factorial);
	 }
	 
	 function _(n, acc) {
		 return n < 2 ? acc : _(n - 1, n * acc);
	 }
	 
	 return _(n, 1);
 };
 
 /** Detect if N is in Fibonacci sequence. */
 isFib = function (n) {
	 var _isInt = isInt,
		  sqrt = Math.sqrt,
		  mul = 5 * n * n;
		  
	 return _isInt(n) ? _isInt(sqrt(mul - 4)) || _isInt(sqrt(mul + 4)) : false;
 };
 
/** Get Fibonacci sequence as an array. */
fibTo = function (n) {
	var ret = [], a = 0, b = 1, tmp;
	 
	if (!isInt(n)) {
		return new CallError(ERRORS.math.fibTo);
	}
	 
	while (n--) {
		ret.push(a);
		tmp = a;
		a = b;
		b += tmp;
	}
	 
	return ret;
};
 
/** Get N-th Fibonacci number. */
fib = function (n) {
	if (!isInt(n)) {
		return new CallError(ERRORS.math.fib);
	}
	
	let sqrt = Math.sqrt;
	let _fpow = fpow;
	
	const SQRT_5 = sqrt(5);
	const P_PHI = (1 + SQRT_5) / 2;
	const M_PHI = (1 - SQRT_5) / 2;
	
	return ~~((_fpow(P_PHI, n) - _fpow(M_PHI, n)) / SQRT_5 + .5);
};
 
/** Exponentiating by squaring algorithm. */
fpow = function (x, n) {
	if (!n) {
		return 1;
	}
	
	let i = 1;
	
	while (n) {
		if (!(n & 1)) {
			n >>= 1;
			x *= x;
		} else {
			n--;
			i *= x;
		}
	}
	
	return i;
};
 
/** Range */
function range(...args) {
	let argsLen = args.length,
		start, stop, step;
	 
	if (!argsLen) {
		throw new Error('expected at least 1 argument, got 0');
	}
	 
	if (argsLen > 3) {
		throw new Error('expected at most 3 arguments, got ' + argsLen);
	}
	 
	if (args.some(arg => !isInt(arg))) {
		throw new Error('arguments must be all integers');
	}
	 
	 switch (argsLen) {
	 case 1:
		start = 0, stop = args[0], step = 1;
		break;
	 case 2:
		start = args[0], stop = args[1], step = 1;
		if (start >= stop) return [];
		break;
	 case 3:
		start = args[0], stop = args[1], step = args[2];
		if (!step) throw new Error('step argument must not be zero');
		if (Math.abs(start) + Math.abs(step) < Math.abs(start)) return [];
		if (start >= stop && !~Math.sign(step)) return [];
		if (start + step >= stop) return [start];
	 }
	 
	 return Array.apply(null, Array(Math.ceil((stop - start) / step))).map((_, idx) => start + step * idx);
 }
 
/** Get prime numbers in range. */
primes = function (a, b) {
	let lst = range(a, b + 1),
		 primes = [],
		 n = Math.abs(b - a),
		 i = 0;
	while (i <= n) {
		
	}
	 
};
 
swap = function (a, b) {
	a ^= b;
	b ^= a;
	a ^= b;
};

isPowOf2 = function (n) {
	return typeof n === 'number' && !!n && !(n & (n - 1));
};

isMinus0 = function (n) {
	return n === 0 && 1 / n === -Infinity;
};
 
 /** Public API */
zJS.math = {
	gcd: gcd, // get Greatest Common Divisor
	hcd: gcd, // alias to gcd
	gcf: gcd, // alias to gcd
	hcf: gcd, // alias to gcd
	gcm: gcd, // alias to gcd
	factorial: factorial, // get factorial
	isFib: isFib, // is particular N is Fibonacci number
	fibTo: fibTo, // get N Fibonacci numbers
	fib: fib, // get N-th Fibonacci number
	fpow: fpow, // fast squaring algorithm
	swap: swap, // swap variables
	isPowOf2: isPowOf2 // determining if an integer is a power of 2
	isMinus0: isMinus0 // detect negative zeros
};
 
export { zJS };