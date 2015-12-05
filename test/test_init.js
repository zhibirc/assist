describe('Initialization tests', function () {
	it('Library itself should be an object', function () {
		expect(Object.prototype.toString.call(zJS)).toBe('[object Object]');
	});
});