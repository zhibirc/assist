/*|----------------|
  | UTIL FUNCTIONS |
  |----------------|*/

let util,
	toRoman,
	fromRoman;

/**
 * Invoke particular object method with specified delay.
 * @param {Object} obj - Object that has specified method.
 * @param {String} method - Method of an object.
 * @param {Object[]} args - Arguments for method.
 * @param {Number} delay - Delay for invocation.
 * @callback cb - Callback to invoke after method invocation.
 * @return {Object} - Given object for cascade/chaining.
 */
later = (obj, method, args, delay, cb) => {
    if (typeof method === 'string') {
        method = obj[method];
    }
    setTimeout(function () {
        method.apply(obj, args);
        cb();
    }, delay);

    return obj;
};

toRoman = n => {
    let map = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 },
		ret = '';
		
    while (n > 0) {
      for (let ch in map) { 
        if (map[ch] <= n) {
          ret += ch, n -= map[ch];
          break;
        }
      }
    }
	
    return ret;
};

fromRoman = n => {
	let map = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 },
		ret = 0;
	
    for (let i = 0, j = n.length, tmp; i < j; i += 1) {
		tmp = map[n[i]]; 
		ret += tmp >= map[n[i < n.length - 1 ? i + 1 : i]] ? tmp : -tmp;
    }
	
    return ret;
};

if (String.prototype.toBase64 === void 0) {
  String.prototype.toBase64 = function () {
    const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let ret = '', ch1, ch2, ch3, enc1, enc2, enc3, enc4, s = String(this);
    for (let i = 0; i < s.length;) {
        ch1 = s.charCodeAt(i++);
        ch2 = s.charCodeAt(i++);
        ch3 = s.charCodeAt(i++);
        enc1 = ch1 >> 2;
        enc2 = (ch1 & 3) << 4 | ch2 >> 4;
        enc3 = isNaN(ch2) ? 64 : ((ch2 & 15) << 2 | ch3 >> 6);
        enc4 = isNaN(ch3) ? 64 : ch3 & 63;
        ret += alpha.charAt(enc1) + alpha.charAt(enc2) + alpha.charAt(enc3) + alpha.charAt(enc4);
    }
    return ret; 
  };
}

if (String.prototype.fromBase64 === void 0) {
  String.prototype.fromBase64 = function () {
    const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let ret = '', ch1, ch2, ch3, enc1, enc2, enc3, enc4, s = String(this);
    s = s.replace(/[^a-z0-9\+\/\=]/gi, '');
    for (let i = 0; i < s.length;) {
        enc1 = alpha.indexOf(s.charAt(i++));
        enc2 = alpha.indexOf(s.charAt(i++));
        enc3 = alpha.indexOf(s.charAt(i++));
        enc4 = alpha.indexOf(s.charAt(i++));
        ch1 = enc1 << 2 | enc2 >> 4;
        ch2 = (enc2 & 15) << 4 | enc3 >> 2;
        ch3 = (enc3 & 3) << 6 | enc4;
        ret += String.fromCharCode(ch1);
        if (enc3 < 64) ret += String.fromCharCode(ch2);
        if (enc4 < 64) ret += String.fromCharCode(ch3);
    }
    return ret; 
  };
}

/** Public API */
util = {
	
};

Object.freeze(util);

export { util };