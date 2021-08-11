const mongoose = require('mongoose')
const Todo = require('../todo') //載入todo.js
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true  })

const db = mongoose.connection

db.once('open', () => {
  console.log('mongodb connected!')

  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}` })
  }
  console.log('done!')
})

db.on('error', () => {
  console.log('mongo error!')
})