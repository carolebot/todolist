// set express and tools
const express = require('express')
const app = express()
const session = require('express-session')
const methodOverride = require('method-override')
const usePassport = require('./config/passport')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
console.log(process.env)
// set localhost port
const PORT = process.env.PORT

// set body-parser
app.use(express.urlencoded({ extended: true }))


// set methodOverride
app.use(methodOverride('_method'))


// set db
require('./config/mongoose')


// express-session
app.use(session({
  secret: process.env.SESSION_SECRECT,
  resave: false,
  saveUninitialized: true
}))

// use passport 
usePassport(app)

// use connect-flash
app.use(flash())

// 參數放到畫面的處理
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

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



