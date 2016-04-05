/**
 * Creates a function that will return a singleton
 * @param {Function} Constructor - function to make singleton
 * @returns {Function} - Singleton
 */
function Singleton (Constructor) {
	var args = Array.prototype.slice.call(arguments, 0)
		, instance

	return function () {

		if (!instance) {
			instance = new (Function.prototype.bind.apply(Constructor, args))
		}

		return instance
	}
}