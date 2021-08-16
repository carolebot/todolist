// set express and tools
const express = require('express')
const app = express()
const Todo = require('./models/todo')
const methodOverride = require('method-override')
// set localhost port
const port = 3000


// set body-parser
const bodyParser = require('body-parser')
app.use(express.urlencoded({ extended: true }))

// set methodOverride
app.use(methodOverride('_method'))

// set db
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.once('open', () => {
  console.log('mongodb connected')
})

db.on('error', () => {
  console.log('mongodb err')
})


// set template engine
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')



// set route
const routes =require('./routes')
app.use(routes)




// start and listen
app.listen(port, () => {
  console.log(`running on http://localhost:${port}`)
})



