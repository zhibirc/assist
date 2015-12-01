define(function () {
	'use strict';
	
	const ERRORS = {
		dom: {},
		util: {},
		math: {
			factorial: 'factorial() only accepts integral values',
			fib: 'fib() only accepts integral values',
			fibTo: 'fibTo() only accepts integral values'
		}
	};
	
	/**
	 *	@exports
	 */
	return ERRORS;
});