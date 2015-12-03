define(function () {
	'use strict';
	
	const ERRORS = {
		dom: {
			fetch: 'Syntax: fetch()'
		},
		util: {
			origins: 'Syntax: origins(array[, preserveOrder])'
		},
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