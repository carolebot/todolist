// set express and tools
const express = require('express')
const app = express()
const session = require('express-session')
const methodOverride = require('method-override')

// set localhost port
const PORT = process.env.PORT || 3000


// set body-parser
app.use(express.urlencoded({ extended: true }))


// set methodOverride
app.use(methodOverride('_method'))


// set route
const routes = require('./routes')
app.use(routes)


// express-session
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))


// set db
require('./config/mongoose')


// set template engine
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')



// start and listen
app.listen(PORT, () => {
  console.log(`running on http://localhost:${PORT}`)
})



