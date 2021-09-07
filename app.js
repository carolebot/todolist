// set express and tools
const express = require('express')
const app = express()
const session = require('express-session')
const methodOverride = require('method-override')
const usePassport = require('./config/passport')
// set localhost port
const PORT = process.env.PORT || 3000


// set body-parser
app.use(express.urlencoded({ extended: true }))


// set methodOverride
app.use(methodOverride('_method'))


// set db
require('./config/mongoose')


// express-session
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))


// use passport 
usePassport(app)


// set route
const routes = require('./routes')
app.use(routes)


// set template engine
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')



// start and listen
app.listen(PORT, () => {
  console.log(`running on http://localhost:${PORT}`)
})



