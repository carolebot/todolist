const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const name = req.body.name
  const userId = req.user._id
  // const todo = new Todo({ name })
  // todo.save()
  //   .then(() => res.redirect('/'))
  //   .catch(error => console.log(error))
  Todo.create({ name, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  // console.log(id)
  Todo.findById({_id, userId})
    .lean()
    .then((todo) => res.render('details', { todo }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id

  Todo.findById({ _id, userId })
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  // 解構賦值
  const { name, isDone } = req.body
  Todo.findOne({userId, _id})
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      todo.save() //save是mongoose資料庫的方法
    })
    .then(() => res.redirect(`/todos/${_id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Todo.findOne({ userId, _id }) //確保資料存在
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
