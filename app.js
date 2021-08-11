// set express and tools
const express = require('express')
const app = express()
const Todo = require('./models/todo')
// set localhost port
const port = 3000

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

// static file


// set route
app.get('/', (req, res) => {

  // 拿到全部的todo資料
  Todo.find()
    .lean() //mongoose轉JS可處理格式
    .then(todos => res.render('index', { todos })) //陣列傳到index
    .catch(err => console.error(err))
})

// start and listen
app.listen(port, () => {
  console.log(`running on http://localhost:${port}`)
})



