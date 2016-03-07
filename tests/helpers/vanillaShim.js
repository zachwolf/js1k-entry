var Promise = require('bluebird')
	, through = require('through2')
	, path    = require('path')
	, fs      = require('fs')
	, caller  = require('caller')

module.exports = function (options) {
	var calledFrom = path.dirname(caller())

	return new Promise(function (resolve) {
		var stream = fs.createReadStream(path.resolve(calledFrom, options.path))
			, chunks = []

		stream
			.pipe(through(function (chunk, enc, cb) {
				chunks.push(chunk.toString('utf8'))
				cb()
			}, function (cb) {
				var file = chunks.join('')

				eval(file)

				resolve(eval(options.exports))
			}))

		stream.on('error', function () {
			console.error('error reading', options.path);
			console.log('full path:', path.join(__dirname, options.path));
		})
	})
}