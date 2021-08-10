// set express and tools
const express = require('express')
const app = express()

// set localhost port
const port = 3000

// set db
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todolist')
const db = mongoose.connection

db.once('open', ()=> {
  console.log('mongodb connected')
})

db.on('error', () => {
  console.log('mongodb err')
})

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



