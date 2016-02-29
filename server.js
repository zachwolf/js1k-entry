var express = require('express')
	, app = express()

app.get('/', (req, res) => {
	res.redirect('/shim.html')
})

app.use(express.static('src'))

app.listen(6513)