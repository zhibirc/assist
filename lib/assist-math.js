/*|----------------|
  | MATH FUNCTIONS |
  |----------------|*/

let math,
	gcd,
	factorial,
	isFib,
	fibTo,
	fib,
	fpow,
	swap,
	isPowOf2,
	isMinus0,
	toBinary,
	countSort,
	shuffle,
	toRadians,
	toDegrees;

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
	let _isInt = isInt,
		sqrt = Math.sqrt,
		mul = 5 * n * n;
		  
	return _isInt(n) ? _isInt(sqrt(mul - 4)) || _isInt(sqrt(mul + 4)) : false;
 };
 
/** Get Fibonacci sequence as an array. */
fibTo = function (n) {
	let ret = [], a = 0, b = 1, tmp;
	 
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

/**
 *	Swap two variables without using third-party temporary storage.
 *	@param {*} a - First variable to swap.
 *	@param {*} b - Second variable to swap.
 *	@returns {Object[]} Swapped variables.
 */
swap = function (a, b) {
	a ^= b;
	b ^= a;
	a ^= b;
	
	return [a, b];
};

/**
 *	Convert integers (including negatives) to binary using two’s complement.
 *	@param {Number} n - Digit to convert.
 *	@returns {String} Binary representation.
 */
toBinary = n => (n >>> 0).toString(2);

/**
 *	Verify if argument is the power of 2.
 *	@param {Number} n - Digit to verify.
 *	@returns {Boolean} Verification result.
 */
isPowOf2 = n => typeof n === 'number' && !!n && !(n & (n - 1));

/**
 *	Verify if argument is -0.
 *	@param {Number} n - Digit to verify.
 *	@returns {Boolean} Verification result.
 */
isMinus0 = n => n === 0 && 1 / n === -Infinity;



/*|---------------------|
  | SORTING ALGORITHMS. |
  |---------------------|*/

/**
 *	Counting sort algorithm for arrays of integers.
 *	@param {Object[]} arr - Array of integers for sorting.
 *	@param {Number} [min] - Minimal value in specified array.
 *	@param {Number} [max] - Maximum value in specified array.
 *	@returns {Object[]} Sorted array.
 */
countSort = function (arr, min = Math.min(...arr), max = Math.max(...arr)) {
	if (!Array.isArray(arr)) {
		throw new CallError(ERRORS.countSort);
	}
	
    let count = [],
		z = 0,
		i;
		
    for (i = min; i <= max; i += 1) {
        count[i] = 0;
    }
	
    for (i = 0; i < arr.length; i += 1) {
        count[arr[i]]++;
    }
	
    for (i = min; i <= max; i += 1) {
        while (count[i]-- > 0) {
            arr[z++] = i;
        }
    }
	
    return arr;
}

/**
 *	Shuffle array of integer.
 *	@param {Object[]} arr - Array of integers.
 *	@returns {Object[]} Shuffled array.
 */
shuffle = function (arr) {
  let i = arr.length, j;
  
  while (--i > 0) {
    j = ~~(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  
  return arr;
};

/**
 * Translate degrees into radians.
 * @param {Number} deg - Degrees.
 * @returns {Number} Radians.
 */
toRadians = deg => +(deg * Math.PI / 180).toFixed(3);

/**
 * Translate radians into degrees.
 * @param {Number} rad - Radians.
 * @returns {Number} Degrees.
 */
toDegrees = rad => +(radians * 180 / Math.PI).toFixed(3);
 
/** Public API */
math = {
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
	isPowOf2: isPowOf2, // determining if an integer is a power of 2
	isMinus0: isMinus0, // detect negative zeros
	toBinary: toBinary, // convert decimal to binary (negatives included)
	countSort: countSort, // counting sort algorithm for arrays of integers
	shuffle: shuffle, // Fisher-Yates shuffle
	toRadians, // Translate degrees into radians
	toDegrees // Translate radians into degrees
};

Object.freeze(math);

export { math };