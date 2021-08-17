// set express and tools
const express = require('express')
const app = express()
const methodOverride = require('method-override')


// set localhost port
const port = 3000


// set body-parser
app.use(express.urlencoded({ extended: true }))


// set methodOverride
app.use(methodOverride('_method'))


// set route
const routes = require('./routes')
app.use(routes)


// set db
require('./config/mongoose')


// set template engine
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')



// start and listen
app.listen(port, () => {
  console.log(`running on http://localhost:${port}`)
})



