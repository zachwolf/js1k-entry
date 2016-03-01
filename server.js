var express = require('express')
	, livereload = require('livereload')
	, app = express()

app.get('/', (req, res) => {
	res.redirect('/shim.html')
})

app.use(express.static('src'))

app.listen(6513)

livereload = require('livereload')
server = livereload.createServer()
server.watch(__dirname + "/src")