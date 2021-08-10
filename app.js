// set express and tools
const express = require('express')
const app = express()

// set localhost port
const port = 3000

// set template engine
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// static file


// set route
app.get('/', (req, res) => {
  res.render('index')
})

// start and listen
app.listen(port, () => {
  console.log(`running on http://localhost:${port}`)
})



