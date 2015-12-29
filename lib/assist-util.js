/*|----------------|
  | UTIL FUNCTIONS |
  |----------------|*/

let util,
	toRoman,
	fromRoman;

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

/** Public API */
util = {
	
};

Object.freeze(util);

export { util };